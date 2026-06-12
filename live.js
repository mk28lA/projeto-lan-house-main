(function () {
  const STORAGE_KEY = "playhouse_live_url_v1";

  const iframe = document.getElementById("phLiveIframe");
  const input = document.getElementById("phLiveUrlInput");
  const button = document.getElementById("phLiveLoadBtn");
  const status = document.getElementById("phLiveStatus");

  if (!iframe || !input || !button || !status) return;

  function setStatus(msg, type) {
    status.textContent = msg;
    status.dataset.type = type || "";
  }

  function normalizeUrl(url) {
    return (url || "").trim();
  }

  function getDefaultSrc() {
    return iframe.getAttribute("data-default-src") || "";
  }

  function getStoredUrl() {
    try {
      return localStorage.getItem(STORAGE_KEY) || "";
    } catch {
      return "";
    }
  }

  function saveStoredUrl(url) {
    try {
      localStorage.setItem(STORAGE_KEY, url);
    } catch {}
  }

  function applySrc(url) {
    const u = normalizeUrl(url);
    if (!u) {
      setStatus("URL do Ao Vivo não configurada.", "error");
      iframe.removeAttribute("src");
      return;
    }

    // Basic safety: only set if it looks like http(s) or blob (still user-controlled)
    if (!/^https?:\/\//i.test(u) && !u.startsWith("blob:")) {
      // allow relative URLs too
      if (!u.startsWith("./") && !u.startsWith("../") && !u.startsWith("/")) {
        setStatus("URL inválida (use link do embed/iframe).", "error");
        return;
      }
    }

    setStatus("Carregando Ao Vivo...");
    iframe.src = u;
    saveStoredUrl(u);
    setStatus("Ao Vivo carregado.", "ok");
  }

  button.addEventListener("click", () => {
    applySrc(input.value);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") button.click();
  });

  // Initial load order: stored url -> default src -> empty
  // Live do próprio site: ignora localStorage e usa apenas o padrão do iframe.
  const def = getDefaultSrc();

  input.value = def || "";
  if (def) applySrc(def);
  else {
    setStatus("Live não configurada (data-default-src vazio).", "error");
  }
})();
