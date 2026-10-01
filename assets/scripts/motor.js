export class Job {
  constructor({ id, business, role, requirements, wage, modality }) {
    this.id = id;
    this.business = business;
    this.role = role;
    this.requirements = requirements;
    this.wage = wage;
    this.modality = modality;
  }
  calcularCompatibilidade(skills) {
    const skillsLower = skills.map((skill) => skill.toLowerCase());
    const isFound = (req) => skillsLower.includes(req.toLowerCase());

    const found = this.requirements.filter(isFound);
    const missing = this.requirements.filter((req) => !isFound(req));
    const percentage = Math.round(
      (found.length / this.requirements.length) * 100,
    );

    return { percentage, found, missing };
  }

  rotulo() {
    return `${this.role} - ${this.business}`;
  }
}
export class JobFrontEnd extends Job {
  constructor(dados) {
    super(dados);
    this.stack = this.requirements.includes("React")
      ? "React"
      : "JavaScript puro";
  }

  rotulo() {
    return `${super.rotulo()} (${this.stack})`;
  }
}

export function classificar(percentage) {
  if (percentage >= 80) {
    return "Alta";
  } else if (percentage >= 50) {
    return "Média";
  } else {
    return "Baixa";
  }
}

export function criarContador() {
  let total = 0;
  return function () {
    total += 1;
    return total;
  };
}

const contarAnalise = criarContador();

export function gerarRecomendacao(results) {
  const counts = {};

  for (const result of results) {
    for (const skill of result.missing) {
      counts[skill] = (counts[skill] || 0) + 1;
    }
  }

  const ranking = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  if (ranking.length === 0) {
    return "Você atende a todos os requisitos das vagas. Bom trabalho!";
  }

  const top = ranking
    .slice(0, 2)
    .map(
      ([skill, qty]) => `${skill} (falta em ${qty} de ${results.length} vagas)`,
    )
    .join(", ");

  return `Para aumentar sua compatibilidade, estude primeiro: ${top}.`;
}
