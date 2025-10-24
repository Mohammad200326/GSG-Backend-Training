# 🧪 Task 8: Testing – Course Module with Supertest & Jest

## 🎯 Goal

Write automated tests for the **Course module** using **Supertest** and **Jest**, ensuring API correctness and reliability.

---

## ✅ Requirements

### 1. Testing Framework

- Use **Jest** as the testing framework.
- Use **Supertest** for HTTP request testing.

### 2. Helper File

- Create a reusable helper file for Supertest setup (e.g., initializing the app, JWT token handling).

### 3. Seed Data with Faker

- Use **Faker.js** to generate mock users and courses for testing.
- Ensure tests do not rely on static data but instead seed **dynamic test data**.

### 4. Course Module Tests

- Write tests for **at least 2 routes** in the Course module  
  (minimum: `POST /courses` and another route of your choice).

### 5. Branching

- Create a new Git branch named **`course-tests`**.
- Commit all test-related changes to this branch.
- Create a Pull Request **without merging** with `main`.

---

## 📂 Suggested Folder Structure

src/
├── tests/ # Test files
│ ├── helpers/ # Supertest helper files
│ └── courses.test.ts
├── ...
jest.config.js

---

## 🧱 Test Scenarios for Course Module

### 1. POST /courses

- ✅ **Success:** COACH or ADMIN can create a course with valid data.
- ❌ **Forbidden:** STUDENT cannot create a course.
- ❌ **Validation Error:** Missing required fields returns 400.

### 2. GET /courses

- ✅ **Success:** Returns a list of all courses (public).
- ❌ **Edge:** Returns an empty array when no courses exist.

### 3. GET /courses/:id

- ✅ **Success:** Returns course details when ID is valid.
- ❌ **Not Found:** Returns 404 for invalid course ID.

### 4. PUT /courses/:id

- ✅ **Success:** Course creator (COACH/ADMIN) updates a course successfully.
- ❌ **Forbidden:** STUDENT cannot update courses.
- ❌ **Not Owner:** COACH cannot update a course created by another COACH.

### 5. DELETE /courses/:id

- ✅ **Success:** Course creator (COACH/ADMIN) deletes a course successfully.
- ❌ **Forbidden:** STUDENT cannot delete courses.
- ❌ **Not Owner:** COACH cannot delete a course created by another COACH.

---

## 📌 Important Notes

- Ensure **Zod validation errors** are tested.
- Keep test code **clean**, **readable**, and **reusable** with helpers.
- Final PR must include:
  - ✅ Updated **README** with test running instructions (`npm run test`).

---

## 🧰 Running the Project & Tests

Start the development server:

```bash
npm run dev
```

Run all tests:

```bash
npm run test
```

## 🧩 Additional Note

📝 **Task 8** was built as a **continuation of Task 7**.  
Task 7 included the complete **TypeScript Express project structure** (without tests).  
In Task 8, **automated testing** for the **Course module** was added using **Supertest** and **Jest**.
