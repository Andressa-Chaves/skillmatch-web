export class Job {
  constructor({ id, business, role, requirements, wage, modality }) {
    this.id = id;
    this.business = business;
    this.role = role;
    this.requirements = requirements;
    this.wage = wage;
    this.modality = modality;
  }

  calculateCompatibility(skills) {
    const skillsLower = skills.map((skill) => skill.toLowerCase());
    const isFound = (req) => skillsLower.includes(req.toLowerCase());

    const found = this.requirements.filter(isFound);
    const missing = this.requirements.filter((req) => !isFound(req));
    const percentage = Math.round(
      (found.length / this.requirements.length) * 100,
    );

    return { percentage, found, missing };
  }

  label() {
    return `${this.role} - ${this.business}`;
  }
}
export class JobFrontEnd extends Job {
  constructor(data) {
    super(data);
    this.stack = this.requirements.includes("React")
      ? "React"
      : "JavaScript puro";
  }

  label() {
    return `${super.label()} (${this.stack})`;
  }
}

export function classify(percentage) {
  if (percentage >= 80) {
    return "Alta";
  } else if (percentage >= 50) {
    return "Média";
  } else {
    return "Baixa";
  }
}

export function createCounter() {
  let total = 0;
  return function () {
    total += 1;
    return total;
  };
}

const provideAnalysis = createCounter();

export function generateRecommendation(results) {
  const counts = {};

  for (const result of results) {
    for (const skill of result.missing) {
      counts[skill] = (counts[skill] || 0) + 1;
    }
  }

  const ranking = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  if (ranking.length === 0) {
    return "Você atende a todos os requisitos das vagas. Parabéns!";
  }

  const top = ranking
    .slice(0, 2)
    .map(
      ([skill, qty]) => `${skill} (falta em ${qty} de ${results.length} vagas)`,
    )
    .join(", ");

  return `Para aumentar sua compatibilidade, estude primeiro: ${top}.`;
}

export function jobAnalyze(applicant, jobs, onComplete) {
  const results = jobs.map((job) => {
    const { percentage, found, missing } = job.calculateCompatibility(
      applicant.skills,
    );
    return {
      job,
      percentage,
      found,
      missing,
      level: classify(percentage),
    };
  });

  if (results.length === 0) {
    return { results, best: null, recommendation: "", analysisNumber: 0 };
  }

  const best = results.reduce((top, current) => {
    if (current.percentage > top.percentage) {
      return current;
    }
    if (
      current.percentage === top.percentage &&
      current.missing.length < top.missing.length
    ) {
      return current;
    }
    return top;
  });

  const analysis = {
    results,
    best,
    recommendation: generateRecommendation(results),
    analysisNumber: provideAnalysis(),
  };

  if (typeof onComplete === "function") {
    onComplete(analysis);
  }

  return analysis;
}