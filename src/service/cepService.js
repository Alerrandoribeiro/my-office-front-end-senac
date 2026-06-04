const BRASIL_API_BASE_URL = "https://brasilapi.com.br/api/cep/v2";

function createError(message) {
  return new Error(message || "Erro na requisição de CEP");
}

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }
  return response.text();
}

export async function buscarEnderecoPorCep(cep) {
  const cepSemMascara = String(cep).replace(/\D/g, "");
  if (cepSemMascara.length !== 8) {
    throw createError("CEP inválido");
  }

  const response = await fetch(`${BRASIL_API_BASE_URL}/${cepSemMascara}`);
  if (!response.ok) {
    const errorPayload = await parseResponse(response);
    throw createError(
      typeof errorPayload === "string" ? errorPayload : JSON.stringify(errorPayload)
    );
  }

  return parseResponse(response);
}
