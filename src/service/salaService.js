import { BASE_API_ORIGIN, API_PREFIX, JSON_HEADERS } from "./apiConfig";

const BASE_URL = `${BASE_API_ORIGIN}${API_PREFIX}/salas`;

export async function buscarTodasSalas() {
  const data = await request();
  const salas = Array.isArray(data) ? data : data?.salas || [];
  return normalizarSalas(salas);
}

export async function buscarSalasDoUsuario(usuarioId) {
  const todasSalas = await buscarTodasSalas();
  return filtrarSalasDoUsuario(todasSalas, usuarioId);
}

export async function cadastrarSala(salaData) {
  const criada = await request("", {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(salaData),
  });
  return normalizarSala(criada);
}

export async function atualizarSala(salaId, salaData) {
  const atualizada = await request(`/${salaId}`, {
    method: "PUT",
    headers: JSON_HEADERS,
    body: JSON.stringify(salaData),
  });
  return normalizarSala(atualizada);
}

export async function excluirSala(salaId) {
  await request(`/${salaId}`, { method: "DELETE" });
  return true;
}

async function request(endpoint = "", options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  if (!response.ok) {
    const payload = await parseResponse(response);
    throw createError(payload);
  }
  return parseResponse(response);
}

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }
  return response.text();
}

function createError(responsePayload) {
  const rawMessage =
    typeof responsePayload === "string"
      ? responsePayload
      : JSON.stringify(responsePayload);
  return new Error(rawMessage || "Erro na requisição de sala");
}

function normalizarImagem(imagem) {
  if (!imagem || typeof imagem !== "string") return imagem;

  const valor = imagem.trim();
  if (valor.startsWith("data:image/")) return valor;
  if (/^https?:\/\//i.test(valor) || valor.startsWith("/")) return valor;

  return `data:image/jpeg;base64,${valor}`;
}

function normalizarIdSala(sala) {
  if (!sala || typeof sala !== "object") return undefined;
  return sala.id ?? sala.idSala ?? sala.id_sala;
}

function normalizarIdUsuario(sala) {
  if (!sala || typeof sala !== "object") return undefined;
  return sala.usuarioId ?? sala.usuario?.id ?? sala.usuario?.idUsuario;
}

function normalizarSala(sala) {
  if (!sala || typeof sala !== "object") return sala;

  const id = normalizarIdSala(sala);
  const usuarioId = normalizarIdUsuario(sala);
  const tipoSala = sala.tipoSala ?? sala.tipo ?? sala.tipo_sala ?? "";

  return {
    ...sala,
    id,
    usuarioId,
    tipoSala,
    nome: sala.nome || tipoSala,
    imagem: normalizarImagem(sala.imagem),
  };
}

function normalizarSalas(salas) {
  if (!Array.isArray(salas)) return [];
  return salas.map(normalizarSala);
}

function filtrarSalasDoUsuario(salas, usuarioId) {
  const id = Number(usuarioId);
  if (Number.isNaN(id)) return [];

  return salas.filter((sala) => {
    const donoId = Number(normalizarIdUsuario(sala));
    return !Number.isNaN(donoId) && donoId === id;
  });
}
