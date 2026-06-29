const API_URL = "http://localhost:8080/api/usuarios";
const API_LOGIN_URL = "http://localhost:8080/api/usuarios/login";
const JSON_HEADERS = {
  "Content-Type": "application/json",
};

export async function cadastrarUsuario(usuario) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(usuario),
  });

  if (!response.ok) {
    const payload = await parseResponse(response);
    throw createError(payload, "Erro ao cadastrar usuário");
  }

  return parseResponse(response);
}

export async function autenticarUsuario(credentials) {
  const response = await fetch(API_LOGIN_URL, {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("unauthorized");
    }

    const payload = await parseResponse(response);
    throw createError(payload, `Erro ao autenticar usuário (${response.status})`);
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

function createError(payload, fallbackMessage) {
  if (!payload) {
    return new Error(fallbackMessage);
  }

  if (typeof payload === "string") {
    return new Error(payload);
  }

  if (payload.message) return new Error(String(payload.message));
  if (payload.error) return new Error(String(payload.error));
  if (payload.msg) return new Error(String(payload.msg));

  return new Error(JSON.stringify(payload));
}
