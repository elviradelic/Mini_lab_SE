const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const CourseFactory = require("./factory/CourseFactory");
const EnrollmentFacade = require("./services/EnrollmentFacade");
const { PercentageStrategy, PassFailStrategy } = require("./services/GradingStrategy");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const dataPath = path.join(__dirname, "data", "courses.json");
const enrollmentFacade = new EnrollmentFacade();

function readCourses() {
  const raw = fs.readFileSync(dataPath, "utf-8");
  const parsed = JSON.parse(raw);
  return parsed.map(course => CourseFactory.createCourse(course.type, course));
}

function saveCourses(courses) {
  fs.writeFileSync(dataPath, JSON.stringify(courses, null, 2));
}

app.get("/courses", (req, res) => {
  const courses = readCourses();
  res.json(courses);
});

app.post("/enroll/:id", (req, res) => {
  const courses = readCourses();
  const courseId = Number(req.params.id);
  const course = courses.find(c => c.id === courseId);

  try {
    enrollmentFacade.enroll(course);
    saveCourses(courses);
    res.json(course);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.get("/enrolled", (req, res) => {
  const courses = readCourses();
  const enrolled = enrollmentFacade.getEnrolledCourses(courses);
  res.json(enrolled);
});

app.get("/score/:id", (req, res) => {
  const courses = readCourses();
  const courseId = Number(req.params.id);
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  const strategyType = req.query.type || "percentage";
  let strategy;

  if (strategyType === "passfail") {
    strategy = new PassFailStrategy();
  } else {
    strategy = new PercentageStrategy();
  }

  res.json({
    course: course.title,
    rawScore: course.score,
    result: strategy.calculate(course.score)
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});