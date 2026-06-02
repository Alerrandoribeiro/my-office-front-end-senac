const USUARIO_LOGADO_KEY = "myoffice-usuario-logado";

export function salvarUsuarioLogado(payload) {
  localStorage.setItem(USUARIO_LOGADO_KEY, JSON.stringify(payload));
}

export function obterUsuarioLogado() {
  const raw = localStorage.getItem(USUARIO_LOGADO_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function obterUsuario() {
  const sessao = obterUsuarioLogado();
  return sessao || null;
}

export function removerUsuarioLogado() {
  localStorage.removeItem(USUARIO_LOGADO_KEY);
}

export function estaLogado() {
  return Boolean(obterUsuario());
}
