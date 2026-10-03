
export function captureProfileForm(form) {
  const skillsArray = form.elements["skills"].value
    .split(",")
    .map((skill) => skill.trim())
    .filter((skill) => skill !== "");

  const experienceValue = form.elements["experience"].value;

  const applicant = {
    name: form.elements["name"].value.trim(),
    area: form.elements["area"].value.trim(),
    skills: skillsArray,
    experience: experienceValue === "" ? null : Number(experienceValue),
  };

  return applicant;
}

function showError(inputId, errorId, message) {
  document.getElementById(errorId).textContent = message;
  document.getElementById(inputId).setAttribute("aria-invalid", "true");
}

function clearError(inputId, errorId) {
  document.getElementById(errorId).textContent = "";
  document.getElementById(inputId).removeAttribute("aria-invalid");
}

export function validateForm(applicant) {
  let formValidate = true;

  clearError("name", "error-name");
  clearError("area", "error-area");
  clearError("skills", "error-skills");
  clearError("experience", "error-experience");

  if (applicant.name === "") {
    showError("name", "error-name", "O campo NOME é obrigatório.");
    formValidate = false;
  }

  if (applicant.area === "") {
    showError("area", "error-area", "O campo ÁREA é obrigatório.");
    formValidate = false;
  }

  if (applicant.skills.length === 0) {
    showError(
      "skills",
      "error-skills",
      "Informe ao menos uma habilidade, separada por vírgula.",
    );
    formValidate = false;
  }

  if (
    applicant.experience === null ||
    Number.isNaN(applicant.experience) ||
    applicant.experience < 0
  ) {
    showError(
      "experience",
      "error-experience",
      "Informe o tempo de experiência em meses (0 ou mais).",
    );
    formValidate = false;
  }

  return formValidate;
}

export function renderProfileCard(applicant) {
  const container = document.getElementById("profile-card");
  container.innerHTML = "";

  const title = document.createElement("h3");
  title.textContent = applicant.name;

  const lines = [
    `Área de interesse: ${applicant.area}`,
    `Experiência: ${applicant.experience} meses`,
    `Habilidades: ${applicant.skills.join(", ")}`,
  ].map((text) => {
    const p = document.createElement("p");
    p.textContent = text;
    return p;
  });

  container.append(title, ...lines);
}

function renderMessage(text, isAlert = false) {
  const container = document.getElementById("best-job");
  container.innerHTML = "";

  const p = document.createElement("p");
  if (isAlert) {
    p.setAttribute("role", "alert");
  }
  p.textContent = text;

  container.append(p);
}

export function renderBestJob(best) {
  if (!best) {
    renderMessage("Nenhuma vaga disponível para comparar.");
    return;
  }

  renderMessage(
    `Vaga mais compatível: ${best.job.label()} — ${best.percentage}%`,
  );
}

export function renderLoading() {
  renderMessage("Carregando vagas…");
}

export function renderEmpty() {
  renderMessage("Nenhuma vaga encontrada.");
}

export function renderError(message) {
  renderMessage(message, true);
}

export function renderRecommendation(text) {
  const container = document.getElementById("recommendation");
  container.innerHTML = "";

  const p = document.createElement("p");
  p.textContent = text;

  container.append(p);
}