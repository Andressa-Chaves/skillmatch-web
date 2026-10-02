const saved = getSavedApplicant();
if (saved) {
  form.elements["name"].value = saved.name;
  form.elements["area"].value = saved.area;
  form.elements["skills"].value = saved.skills.join(", ");
  form.elements["experience"].value = saved.experience;
}

import { captureProfileForm, validateForm, renderProfileCard, renderBestJob, renderLoading, renderEmpty, renderError } from "./ui.js";
import { JobFrontEnd, jobAnalyze } from "./motor.js";
import { loadJobs, saveApplicant } from "./dados.js";

const form = document.getElementById("form-profile");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const applicant = captureProfileForm(form);

  if (!validateForm(applicant)) {
    return;
  }

  renderProfileCard(applicant);
  saveApplicant(applicant);
  renderLoading();

  try {
    const jobsData = await loadJobs();

    if (jobsData.length === 0) {
      renderEmpty();
      return;
    }

    const jobs = jobsData.map((data) => new JobFrontEnd(data));
    const analysis = jobAnalyze(applicant, jobs);

    renderBestJob(analysis.best);
  } catch (error) {
    renderError(error.message);
  }
});