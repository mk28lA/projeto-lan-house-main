(() => {
  const USERS_KEY = 'playhouse_auth_users_v1';

  function readUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch {
      return [];
    }
  }

  function writeUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function setMsg(text, type) {
    const el = document.getElementById('msg');
    if (!el) return;
    el.textContent = text || '';
    el.classList.remove('ok', 'err');
    if (type) el.classList.add(type);
  }

  function setInputError(input, isErr) {
    if (!input) return;
    input.classList.toggle('err', !!isErr);
  }

  function digitsOnly(str) {
    return String(str || '').replace(/\D/g, '');
  }

  function formatCPF(raw) {
    const d = digitsOnly(raw).slice(0, 11);
    const p1 = d.slice(0, 3);
    const p2 = d.slice(3, 6);
    const p3 = d.slice(6, 9);
    const p4 = d.slice(9, 11);
    let out = p1;
    if (p2) out += `.${p2}`;
    if (p3) out += `.${p3}`;
    if (p4) out += `-${p4}`;
    return out;
  }

  function isValidCPF(cpf) {
    const d = digitsOnly(cpf);
    if (d.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(d)) return false;

    const calc = (base, factorStart) => {
      let sum = 0;
      for (let i = 0; i < base.length; i++) {
        sum += Number(base[i]) * (factorStart - i);
      }
      const mod = sum % 11;
      return mod < 2 ? 0 : 11 - mod;
    };

    const base9 = d.slice(0, 9);
    const d1 = calc(base9, 10);
    const base10 = base9 + String(d1);
    const d2 = calc(base10, 11);

    return d === base9 + String(d1) + String(d2);
  }

  function ageFromDate(dateStr) {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return null;
    const now = new Date();
    let age = now.getFullYear() - d.getFullYear();
    const m = now.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
    return age;
  }

  function passwordScore(pw) {
    // 0..100 heurístico simples
    const len = pw.length;
    if (!pw) return 0;

    let score = 0;
    score += Math.min(40, len * 4);
    if (/[a-z]/.test(pw)) score += 15;
    if (/[A-Z]/.test(pw)) score += 15;
    if (/[0-9]/.test(pw)) score += 15;
    if (/[^a-zA-Z0-9]/.test(pw)) score += 15;

    // penaliza repetição muito curta
    if (len < 8) score = Math.min(score, 45);

    return Math.max(0, Math.min(100, score));
  }

  function passwordLabel(score) {
    if (score < 30) return 'Fraca';
    if (score < 60) return 'Média';
    if (score < 85) return 'Forte';
    return 'Muito forte';
  }

  function updateStrengthUI(pw) {
    const bar = document.getElementById('strengthBar');
    const text = document.getElementById('strengthText');
    const row = document.getElementById('strengthText');

    if (!bar || !text) return;

    const s = passwordScore(pw);
    bar.style.width = `${s}%`;
    bar.setAttribute('aria-valuenow', String(s));
    text.textContent = passwordLabel(s);
  }

  function togglePasswordVisibility(inputId, toggleId) {
    const input = document.getElementById(inputId);
    const btn = document.getElementById(toggleId);
    if (!input || !btn) return;

    btn.addEventListener('click', () => {
      const isPwd = input.type === 'password';
      input.type = isPwd ? 'text' : 'password';
      btn.textContent = isPwd ? '🙈' : '👁';
      btn.setAttribute('aria-label', isPwd ? 'Ocultar senha' : 'Mostrar senha');
    });
  }

  function selectAvatar(avatarBtn) {
    const grid = avatarBtn?.closest('.avatar-grid');
    if (!grid) return;

    const selected = grid.querySelectorAll('.avatar[data-selected="true"]');
    selected.forEach(el => el.dataset.selected = 'false');

    avatarBtn.dataset.selected = 'true';
    const avatarValue = avatarBtn.getAttribute('data-avatar') || '';
    const hidden = document.getElementById('avatar');
    if (hidden) hidden.value = avatarValue;
  }

  function initAvatar() {
    const grid = document.querySelector('.avatar-grid');
    if (!grid) return;

    grid.addEventListener('click', (e) => {
      const btn = e.target.closest('button.avatar');
      if (!btn) return;
      selectAvatar(btn);
    });
  }

  window.cadastrar = function cadastrar() {
    setMsg('', null);

    const get = (id) => document.getElementById(id);
    const nomeEl = get('nome');
    const usuarioEl = get('usuario');
    const emailEl = get('email');
    const telefoneEl = get('telefone');
    const cpfEl = get('cpf');
    const nascEl = get('nascimento');
    const senhaEl = get('senha');
    const senha2El = get('senha2');

    const termosEl = get('termos');
    const promosEl = get('promos');
    const avatarEl = get('avatar');
    const planoEl = document.querySelector('input[name="plano"]:checked');

    const nome = (nomeEl?.value || '').trim();
    const usuario = (usuarioEl?.value || '').trim();
    const email = (emailEl?.value || '').trim();
    const telefone = (telefoneEl?.value || '').trim();
    const cpf = (cpfEl?.value || '').trim();
    const nascimento = nascEl?.value || '';
    const senha = senhaEl?.value || '';
    const senha2 = senha2El?.value || '';
    const avatar = avatarEl?.value || '';
    const plano = planoEl?.value || 'básica';

    // limpa erros
    [nomeEl, usuarioEl, emailEl, telefoneEl, cpfEl, nascEl, senhaEl, senha2El].forEach(el => setInputError(el, false));

    if (!nome) {
      setInputError(nomeEl, true);
      return setMsg('Digite seu nome completo.', 'err');
    }
    if (!usuario) {
      setInputError(usuarioEl, true);
      return setMsg('Digite um nome de usuário.', 'err');
    }
    if (!email) {
      setInputError(emailEl, true);
      return setMsg('Digite seu e-mail.', 'err');
    }
    if (!senha) {
      setInputError(senhaEl, true);
      return setMsg('Digite uma senha.', 'err');
    }
    if (senha.length < 6) {
      setInputError(senhaEl, true);
      return setMsg('A senha deve ter pelo menos 6 caracteres (demo).', 'err');
    }
    if (senha !== senha2) {
      setInputError(senha2El, true);
      return setMsg('As senhas não conferem.', 'err');
    }

    if (!termosEl?.checked) return setMsg('Você precisa aceitar os termos de uso.', 'err');

    if (!telefone) {
      setInputError(telefoneEl, true);
      return setMsg('Digite seu telefone/WhatsApp.', 'err');
    }

    if (!cpf) {
      setInputError(cpfEl, true);
      return setMsg('Digite seu CPF.', 'err');
    }
    if (!isValidCPF(cpf)) {
      setInputError(cpfEl, true);
      return setMsg('CPF inválido. Verifique e tente novamente.', 'err');
    }

    if (!nascimento) {
      setInputError(nascEl, true);
      return setMsg('Selecione sua data de nascimento.', 'err');
    }
    const age = ageFromDate(nascimento);
    if (age === null) {
      setInputError(nascEl, true);
      return setMsg('Data de nascimento inválida.', 'err');
    }
    if (age < 0 || age > 120) {
      setInputError(nascEl, true);
      return setMsg('Data de nascimento fora do intervalo.', 'err');
    }

    const users = readUsers();
    const exists = users.some(u => u.usuario === usuario || u.email === email);
    if (exists) return setMsg('Usuário ou e-mail já cadastrado.', 'err');

    users.push({
      id: crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()),
      nome,
      usuario,
      email,
      telefone,
      cpf: digitsOnly(cpf),
      nascimento,
      senha, // demo (sem hashing)
      avatar,
      plano,
      promos: !!promosEl?.checked,
      termos: true
    });

    writeUsers(users);
    setMsg('Cadastro realizado! Faça login.', 'ok');

    // limpa campos
    [nomeEl, usuarioEl, emailEl, telefoneEl, cpfEl, nascEl, senhaEl, senha2El].forEach(el => {
      if (!el) return;
      if (el.tagName === 'INPUT' && el.type === 'date') el.value = '';
      else el.value = '';
    });
    if (termosEl) termosEl.checked = false;
    if (promosEl) promosEl.checked = false;
    const grid = document.querySelector('.avatar-grid');
    if (grid) {
      grid.querySelectorAll('.avatar').forEach(a => (a.dataset.selected = 'false'));
    }
    if (avatarEl) avatarEl.value = '';

    setTimeout(() => {
      window.location.href = 'login.html';
    }, 700);
  };

  function init() {
    // show/hide senha
    togglePasswordVisibility('senha', 'toggleSenha');
    togglePasswordVisibility('senha2', 'toggleSenha2');

    // strength
    const senhaEl = document.getElementById('senha');
    if (senhaEl) {
      senhaEl.addEventListener('input', () => updateStrengthUI(senhaEl.value || ''));
      updateStrengthUI(senhaEl.value || '');
    }

    // CPF format
    const cpfEl = document.getElementById('cpf');
    if (cpfEl) {
      cpfEl.addEventListener('input', () => {
        const formatted = formatCPF(cpfEl.value);
        cpfEl.value = formatted;
      });
    }

    initAvatar();
  }

  init();
})();

