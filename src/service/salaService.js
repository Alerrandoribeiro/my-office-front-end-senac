const BASE_URL = "http://localhost:8080/api/salas";

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }
  return response.text();
}

function createError(message) {
  return new Error(message || "Erro na requisição de sala");
}

async function buscarTodasSalas() {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    const errorPayload = await parseResponse(response);
    throw createError(typeof errorPayload === "string" ? errorPayload : JSON.stringify(errorPayload));
  }
  const data = await parseResponse(response);
  return Array.isArray(data) ? data : data?.salas || [];
}

function filtrarSalasDoUsuario(salas, userId) {
  return salas.filter((sala) => {
    if (!sala || typeof sala !== "object") return false;

    return (
      sala.usuarioId === userId ||
      sala.idUsuario === userId ||
      sala.usuario?.id === userId ||
      sala.usuario?.idUsuario === userId ||
      sala.usuario?.id === Number(userId) ||
      sala.usuario?.idUsuario === Number(userId) ||
      sala.usuarioId === Number(userId) ||
      sala.idUsuario === Number(userId)
    );
  });
}

function temMetadadosDeProprietario(salas) {
  return salas.some((sala) => {
    if (!sala || typeof sala !== "object") return false;
    return (
      sala.usuarioId !== undefined ||
      sala.idUsuario !== undefined ||
      (sala.usuario && typeof sala.usuario === "object")
    );
  });
}

export async function buscarSalasDoUsuario(userId) {
  const todasSalas = await buscarTodasSalas();
  return filtrarSalasDoUsuario(todasSalas, userId);
}

export async function excluirSala(salaId) {
  const response = await fetch(`${BASE_URL}/${salaId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errorPayload = await parseResponse(response);
    throw createError(typeof errorPayload === "string" ? errorPayload : JSON.stringify(errorPayload));
  }
  return true;
}

export async function atualizarSala(salaId, salaData) {
  const response = await fetch(`${BASE_URL}/${salaId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(salaData),
  });
  if (!response.ok) {
    const errorPayload = await parseResponse(response);
    throw createError(typeof errorPayload === "string" ? errorPayload : JSON.stringify(errorPayload));
  }
  return parseResponse(response);
}
