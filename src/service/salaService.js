const BASE_URL = "http://localhost:8080/api/salas";
const JSON_HEADERS = {
  "Content-Type": "application/json",
};

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

async function request(endpoint = "", options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  if (!response.ok) {
    const payload = await parseResponse(response);
    throw createError(payload);
  }
  return parseResponse(response);
}

function normalizeImage(image) {
  if (!image || typeof image !== "string") return image;

  const value = image.trim();
  if (value.startsWith("data:image/")) return value;
  if (/^https?:\/\//i.test(value) || value.startsWith("/")) return value;

  return `data:image/jpeg;base64,${value}`;
}

function normalizeRoomId(room) {
  if (!room || typeof room !== "object") return undefined;
  return room.id ?? room.idSala ?? room.id_sala;
}

function normalizeUserId(room) {
  if (!room || typeof room !== "object") return undefined;
  return (
    room.usuarioId ??
    room.idUsuario ??
    room.usuario?.id ??
    room.usuario?.idUsuario
  );
}

function normalizeRoom(room) {
  if (!room || typeof room !== "object") return room;

  const id = normalizeRoomId(room);
  const usuarioId = normalizeUserId(room);
  const tipoSala = room.tipoSala ?? room.tipo ?? room.tipo_sala ?? "";

  return {
    ...room,
    id,
    idSala: id,
    id_sala: id,
    usuarioId,
    tipoSala,
    tipo: room.tipo ?? room.tipoSala ?? room.tipo_sala ?? "",
    nome: room.nome || tipoSala,
    imagem: normalizeImage(room.imagem),
  };
}

function normalizeRooms(rooms) {
  if (!Array.isArray(rooms)) return [];
  return rooms.map(normalizeRoom);
}

export async function buscarTodasSalas() {
  const data = await request();
  const rooms = Array.isArray(data) ? data : data?.salas || [];
  return normalizeRooms(rooms);
}

function filterRoomsOfUser(rooms, userId) {
  const id = Number(userId);
  if (Number.isNaN(id)) return [];

  return rooms.filter((room) => {
    const ownerId = Number(normalizeUserId(room));
    return !Number.isNaN(ownerId) && ownerId === id;
  });
}

export async function buscarSalasDoUsuario(userId) {
  const allRooms = await buscarTodasSalas();
  return filterRoomsOfUser(allRooms, userId);
}

export async function excluirSala(salaId) {
  await request(`/${salaId}`, { method: "DELETE" });
  return true;
}

export async function atualizarSala(salaId, salaData) {
  const updated = await request(`/${salaId}`, {
    method: "PUT",
    headers: JSON_HEADERS,
    body: JSON.stringify(salaData),
  });
  return normalizeRoom(updated);
}

export async function cadastrarSala(salaData) {
  const created = await request("", {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(salaData),
  });
  return normalizeRoom(created);
}
