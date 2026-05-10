const API_URL = "http://localhost:8080/api/usuarios";

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