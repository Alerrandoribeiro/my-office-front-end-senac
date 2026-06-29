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
    throw new Error("Usuário já cadastrado!");
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
  if (errorPayload === null || errorPayload === undefined) {
    return "Resposta de erro inválida";
  }

  if (typeof errorPayload === "string") {
    return errorPayload;
  }

  if (typeof errorPayload === "object") {
    if (errorPayload.message) return String(errorPayload.message);
    if (errorPayload.msg) return String(errorPayload.msg);
    if (errorPayload.error) return typeof errorPayload.error === "string" ? errorPayload.error : JSON.stringify(errorPayload.error);
    if (errorPayload.erro) return String(errorPayload.erro);
    if (errorPayload.status && errorPayload.error) return `${errorPayload.status} - ${errorPayload.error}`;

    const keysToTry = ["detail", "details", "descricao", "description"];
    for (const k of keysToTry) {
      if (errorPayload[k]) return String(errorPayload[k]);
    }
    try {
      return JSON.stringify(errorPayload);
    } catch (e) {
      return String(errorPayload);
    }
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
    if (response.status === 401) {
      throw new Error("unauthorized");
    }

    const errorPayload = await parseResponse(response);
    const errorText = formatErrorMessage(errorPayload);
    throw new Error(errorText || `Erro ao autenticar usuário (${response.status})`);
  }

  return parseResponse(response);
}