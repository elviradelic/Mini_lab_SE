class CourseFactory {
  static createCourse(type, data) {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      type: type,
      progress: data.progress ?? 0,
      enrolled: data.enrolled ?? false,
      score: data.score ?? 0
    };
  }
}

module.exports = CourseFactory;