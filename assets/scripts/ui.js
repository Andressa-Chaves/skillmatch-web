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
            "Informe ao menos uma habilidade, separada por vírgula."
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
            "Informe o tempo de experiência em meses (0 ou mais)."
        );
        formValidate = false;
    }

    return formValidate;
}