const API_URL = "http://localhost:8080/api/usuarios";
const API_LOGIN_URL = "http://localhost:8080/api/usuarios/login";

export async function cadastrarUsuario(usuario) {

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  });

  if (!response.ok) {
    throw new Error("Erro ao cadastrar usuário");
  }

  return response.json();
}

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }
  return response.text();
}

function formatErrorMessage(errorPayload) {
  if (!errorPayload && errorPayload !== 0) {
    return "Resposta de erro inválida";
  }

  if (typeof errorPayload === "string") {
    return errorPayload;
  }

  if (typeof errorPayload === "object") {
    return JSON.stringify(errorPayload, null, 2);
  }

  return String(errorPayload);
}

export async function autenticarUsuario(credentials) {
  const response = await fetch(API_LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorPayload = await parseResponse(response);
    const errorText = formatErrorMessage(errorPayload);
    throw new Error(errorText || `Erro ao autenticar usuário (${response.status})`);
  }

  return parseResponse(response);
}