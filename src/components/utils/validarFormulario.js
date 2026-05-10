export function campoVazio(valor) {
  return !valor?.trim();
}

export function preencherCamposObrigatorios(...campos) {
  return campos.some((campo) => campoVazio(campo));
}

export function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function senhaForte(senha) {
  return senha.length >= 8;
}

export function telefoneValido(telefone) {
  const numeros = telefone.replace(/\D/g, "");
  return numeros.length >= 11;
}

export function senhasIguais(senha, confirmarSenha) {
  return senha === confirmarSenha;
}