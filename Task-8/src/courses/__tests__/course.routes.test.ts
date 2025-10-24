import {
  adminAuthedTestAgent,
  adminUser,
  coachAuthedTestAgent,
  coachUser,
  studentAuthedTestAgent,
  studentUser,
  unAuthedTestAgent,
} from "../../../tests/helper/supertest.helper";
import { Course } from "../course.entity";
import { extractFields } from "../../utils/object.util";
import { createRandomCourse } from "../../../seeds/course.seed";
import { coursesData } from "../course.data";

describe("course routes endpoints", () => {
  /* POST /api/v1/courses */
  // 1- POST /api/v1/courses (Success for Admin Role)
  it("POST /api/v1/courses should create course and return it", async () => {
    const newCourseSeeds = extractFields(createRandomCourse(adminUser!.id), [
      "title",
      "description",
    ]);

    const response = await adminAuthedTestAgent
      .post("/api/v1/courses")
      .send(newCourseSeeds);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      success: true,
      data: expect.objectContaining<Partial<Course>>({
        title: newCourseSeeds.title,
        description: newCourseSeeds.description,
      }),
    });
  });

  // 2- POST /api/v1/courses (Success for Coach Role)
  it("POST /api/v1/courses should create course and return it", async () => {
    const newCourseSeeds = extractFields(createRandomCourse(coachUser!.id), [
      "title",
      "description",
    ]);

    const response = await coachAuthedTestAgent
      .post("/api/v1/courses")
      .send(newCourseSeeds);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      success: true,
      data: expect.objectContaining<Partial<Course>>({
        title: newCourseSeeds.title,
        description: newCourseSeeds.description,
      }),
    });
  });

  // 3- POST /api/v1/courses (Forbidden for Student Role)
  it("POST /api/v1/courses will throw error 403", async () => {
    const newCourseSeeds = extractFields(createRandomCourse(studentUser!.id), [
      "title",
      "description",
    ]);

    const response = await studentAuthedTestAgent
      .post("/api/v1/courses")
      .send(newCourseSeeds);

    expect(response.statusCode).toBe(403);
    expect(response.body).toEqual({
      success: false,
      error: expect.objectContaining({
        statusCode: 403,
        message: "Access denied",
      }),
    });
  });

  // 4- POST /api/v1/courses (Validation Error for Missing Required Fields)
  it("POST /api/v1/courses will throw error 400", async () => {
    const newCourseSeeds = extractFields(createRandomCourse(adminUser!.id), [
      "title",
    ]);

    const response = await adminAuthedTestAgent
      .post("/api/v1/courses")
      .send(newCourseSeeds);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      success: false,
      error: expect.objectContaining({
        statusCode: 400,
        message: "Missing required fields",
      }),
    });
  });

  /* GET /api/v1/courses */
  it("GET /api/v1/courses should return array of courses or an empty array if no courses exist", async () => {
    const response = await unAuthedTestAgent.get("/api/v1/courses");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: expect.any(Array),
    });
  });

  /* GET /api/v1/courses/:id */
  // 1- GET /api/v1/courses/:id (Returns course details [ID is valid])
  it("GET /api/v1/courses/:id should return course that match with passed id", async () => {
    const course = coursesData[0];
    const courseId = course!.id;

    const response = await unAuthedTestAgent.get(`/api/v1/courses/${courseId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: expect.objectContaining<Partial<Course>>({
        id: courseId,
        title: expect.any(String),
        description: expect.any(String),
      }),
    });
  });

  // 2- GET /api/v1/courses/:id (Returns 404 for [invalid course ID])
  it("GET /api/v1/courses/:id should return 404 for because invalid id passed", async () => {
    const invalidCourseId = "non-existent-id-123";

    const response = await unAuthedTestAgent.get(
      `/api/v1/courses/${invalidCourseId}`
    );

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      success: false,
      error: expect.objectContaining({
        statusCode: 404,
        message: "Course Not Found!",
      }),
    });
  });
});
