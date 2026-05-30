const USUARIO_LOGADO_KEY = "myoffice-usuario-logado";

export function salvarUsuarioLogado(usuario) {
  localStorage.setItem(USUARIO_LOGADO_KEY, JSON.stringify(usuario));
}

export function obterUsuarioLogado() {
  const usuario = localStorage.getItem(USUARIO_LOGADO_KEY);
  return usuario ? JSON.parse(usuario) : null;
}

export function removerUsuarioLogado() {
  localStorage.removeItem(USUARIO_LOGADO_KEY);
}

export function estaLogado() {
  return Boolean(obterUsuarioLogado());
}
