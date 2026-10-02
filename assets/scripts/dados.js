export function renderLoading() {
  document.getElementById("best-job").innerHTML = "<p>Carregando vagas…</p>";
}

export function renderEmpty() {
  document.getElementById("best-job").innerHTML = "<p>Nenhuma vaga encontrada.</p>";
}

export function renderError(message) {
  document.getElementById("best-job").innerHTML = `<p role="alert">${message}</p>`;
}