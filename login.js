(() => {
  const USERS_KEY = 'playhouse_auth_users_v1';
  const SESSION_KEY = 'playhouse_auth_session_v1';

  function readUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch {
      return [];
    }
  }

  function setMsg(text, type) {
    const el = document.getElementById('msg');
    if (!el) return;
    el.textContent = text || '';
    el.classList.remove('ok', 'err');
    if (type) el.classList.add(type);
  }

  function getSession() {
    try {
      return JSON.parse(sessionStorage.getItem(SESSION_KEY));
    } catch {
      return null;
    }
  }

  function setLoggedPanel() {
    const panel = document.getElementById('loggedPanel');
    if (!panel) return;
    const session = getSession();
    panel.style.display = session && session.user ? 'block' : 'none';
  }

  window.limparSessao = function limparSessao() {
    sessionStorage.removeItem(SESSION_KEY);
    setLoggedPanel();
    setMsg('Sessão encerrada.', 'ok');
  };

  window.fazerLogin = function fazerLogin() {
    const login = (document.getElementById('login').value || '').trim();
    const senha = document.getElementById('senha').value || '';

    setMsg('', null);

    if (!login) return setMsg('Digite seu usuário ou email.', 'err');
    if (!senha) return setMsg('Digite sua senha.', 'err');

    const users = readUsers();
    const user = users.find(u => (u.usuario === login || u.email === login) && u.senha === senha);

    if (!user) return setMsg('Usuário ou senha incorretos.', 'err');

    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ user: { id: user.id, nome: user.nome, usuario: user.usuario, email: user.email } }));
    setLoggedPanel();
    setMsg('Login realizado com sucesso!', 'ok');

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 700);
  };

  // init
  setLoggedPanel();
})();

