export class Job {
    constructor({id, business, role, requirements, wage, modality}) {
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
        const percentage = Math.round((found.length / this.requirements.length) * 100);

        return { percentage, found, missing };
    }
}
