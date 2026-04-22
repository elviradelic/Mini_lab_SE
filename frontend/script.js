const API_URL = "http://localhost:3000";

async function loadCourses() {
  const response = await fetch(`${API_URL}/courses`);
  const courses = await response.json();

  const container = document.getElementById("courses");
  container.innerHTML = "";

  for (const course of courses) {
    const scoreResponse = await fetch(`${API_URL}/score/${course.id}?type=percentage`);
    const scoreData = await scoreResponse.json();

    const card = document.createElement("div");
    card.className = "course-card";
    card.innerHTML = `
      <h3>${course.title}</h3>
      <p>${course.description}</p>
      <p><strong>Progress:</strong> ${course.progress}%</p>
      <p><strong>Score:</strong> ${scoreData.result}</p>
      <button onclick="enroll(${course.id})">Enroll</button>
    `;
    container.appendChild(card);
  }
}

async function enroll(id) {
  await fetch(`${API_URL}/enroll/${id}`, {
    method: "POST"
  });

  await loadCourses();
  await loadEnrolledCourses();
}

async function loadEnrolledCourses() {
  const response = await fetch(`${API_URL}/enrolled`);
  const courses = await response.json();

  const container = document.getElementById("enrolled");
  container.innerHTML = "";

  if (courses.length === 0) {
    container.innerHTML = "<p>No enrolled courses yet.</p>";
    return;
  }

  for (const course of courses) {
    const scoreResponse = await fetch(`${API_URL}/score/${course.id}?type=passfail`);
    const scoreData = await scoreResponse.json();

    const card = document.createElement("div");
    card.className = "course-card";
    card.innerHTML = `
      <h3>${course.title}</h3>
      <p><strong>Progress:</strong> ${course.progress}%</p>
      <p><strong>Final Result:</strong> ${scoreData.result}</p>
    `;
    container.appendChild(card);
  }
}

loadCourses();
loadEnrolledCourses();