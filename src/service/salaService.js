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

function normalizarImagem(imagem) {
  if (!imagem || typeof imagem !== "string") return imagem;

  const valor = imagem.trim();
  if (valor.startsWith("data:image/")) {
    return valor;
  }

  if (/^https?:\/\//i.test(valor) || valor.startsWith("/")) {
    return valor;
  }

  return `data:image/jpeg;base64,${valor}`;
}

function normalizarSala(sala) {
  if (!sala || typeof sala !== "object") return sala;

  const tipoPadrao = sala.tipoSala || sala.tipo || sala.tipo_sala || "";

  return {
    ...sala,
    tipoSala: sala.tipoSala || sala.tipo || sala.tipo_sala || "",
    tipo: sala.tipo || sala.tipoSala || sala.tipo_sala || "",
    nome: sala.nome || tipoPadrao,
    imagem: normalizarImagem(sala.imagem),
  };
}

function normalizarSalas(salas) {
  if (!Array.isArray(salas)) return [];
  return salas.map(normalizarSala);
}

export async function buscarTodasSalas() {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    const errorPayload = await parseResponse(response);
    throw createError(typeof errorPayload === "string" ? errorPayload : JSON.stringify(errorPayload));
  }
  const data = await parseResponse(response);
  const result = Array.isArray(data) ? data : data?.salas || [];
  return normalizarSalas(result);
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
  const updated = await parseResponse(response);
  return normalizarSala(updated);
}

export async function cadastrarSala(salaData) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(salaData),
  });
  if (!response.ok) {
    const errorPayload = await parseResponse(response);
    throw createError(typeof errorPayload === "string" ? errorPayload : JSON.stringify(errorPayload));
  }
  const created = await parseResponse(response);
  return normalizarSala(created);
}
