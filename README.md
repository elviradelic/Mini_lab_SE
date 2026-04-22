# Mini LMS – Course Catalogue with Enrollment

A small Learning Management System mini-app with course listing, enrollment, and progress tracking.

## Tech Stack
- Node.js
- Express
- HTML
- CSS
- Vanilla JavaScript

## Connection to Labs 5–7
I analyzed Open edX in Labs 5–7 (category: Learning Management System / Course Platform).
I am building a Course Catalogue with Enrollment mini-application, which belongs to the same category.

## Features
- View all courses
- Enroll in a course
- View enrolled courses
- View score/progress summary

## Patterns Applied

### 1. Factory Method
**Files:** `backend/factory/CourseFactory.js`  
Used to create course objects in a consistent way and avoid scattered object creation logic.

### 2. Facade
**Files:** `backend/services/EnrollmentFacade.js`  
Simplifies enrollment-related operations and hides orchestration from the controller.

### 3. Strategy
**Files:** `backend/services/GradingStrategy.js`  
Supports different grading algorithms (percentage and pass/fail) without hardcoding them in the main logic.

## Repository Requirements
- public GitHub repository
- main branch + feature branch
- multiple commits
- pull request and merge

## Optional Deployment
Not deployed.