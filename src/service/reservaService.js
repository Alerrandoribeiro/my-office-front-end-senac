import { BASE_API_ORIGIN, API_PREFIX, JSON_HEADERS } from "./apiConfig";

const BASE_URL = `${BASE_API_ORIGIN}${API_PREFIX}/reservas`;

export async function criarReserva(reserva) {
  const payload = {
    usuarioId: Number(reserva.usuarioId),
    salaId: Number(reserva.salaId),
    data: reserva.data,
  };

  return request("", {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(payload),
  });
}

export async function buscarTodasReservas() {
  return request();
}

export async function buscarReservasPorUsuario(usuarioId) {
  const todasReservas = await buscarTodasReservas();
  if (!Array.isArray(todasReservas)) return [];

  return todasReservas.filter((reserva) => {
    const reservaUsuarioId = reserva.usuarioId || reserva.usuario_id || reserva.usuario?.id;
    return Number(reservaUsuarioId) === Number(usuarioId);
  });
}

export async function buscarReservasPorSala(salaId) {
  const todasReservas = await buscarTodasReservas();
  if (!Array.isArray(todasReservas)) return [];

  return todasReservas.filter((reserva) => {
    const reservaSalaId = reserva.salaId || reserva.sala_id || reserva.sala?.id;
    return Number(reservaSalaId) === Number(salaId);
  });
}

export async function atualizarReserva(id, reservaData) {
  return request(`/${id}`, {
    method: "PUT",
    headers: JSON_HEADERS,
    body: JSON.stringify(reservaData),
  });
}

export async function deletarReserva(id) {
  return request(`/${id}`, {
    method: "DELETE",
    headers: JSON_HEADERS,
  });
}

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }
  return response.text();
}

function createError(responsePayload) {
  if (!responsePayload) {
    return new Error("Erro na requisição de reserva");
  }

  const message =
    typeof responsePayload === "string"
      ? responsePayload
      : responsePayload.message || responsePayload.error || JSON.stringify(responsePayload);

  return new Error(message || "Erro na requisição de reserva");
}

async function request(endpoint = "", options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    const payload = await parseResponse(response);
    throw createError(payload);
  }

  return parseResponse(response);
}
