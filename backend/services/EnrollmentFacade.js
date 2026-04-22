class EnrollmentFacade {
  enroll(course) {
    if (!course) {
      throw new Error("Course not found");
    }

    course.enrolled = true;
    course.progress = 10;

    return course;
  }

  getEnrolledCourses(courses) {
    return courses.filter(course => course.enrolled);
  }
}

module.exports = EnrollmentFacade;