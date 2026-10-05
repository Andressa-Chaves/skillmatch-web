const APPLICANT_KEY = "skillmatch:applicant";

export async function loadJobs() {
  try {
    const response = await fetch("./assets/data/vagas.json");

    if (!response.ok) {
      throw new Error(`Erro ${response.status} ao buscar o arquivo de vagas.`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error(
      "Não foi possível carregar as vagas. Tente novamente mais tarde.",
    );
  }
}

export function saveApplicant(applicant) {
  localStorage.setItem(APPLICANT_KEY, JSON.stringify(applicant));
}

export function getSavedApplicant() {
  const raw = localStorage.getItem(APPLICANT_KEY);

  if (raw === null) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
}