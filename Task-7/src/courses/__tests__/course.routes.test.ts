import { success } from "zod";
import {
  authedTestAgent,
  unAuthedTestAgent,
} from "../../../tests/helper/supertest.helper";
import { Course } from "../course.entity";
import { extractFields } from "../../utils/object.util";
import { createRandomCourse } from "../../../seeds/course.seed";
import { coursesData } from "../course.data";

describe("course routes endpoints", () => {
  it("POST /api/v1/courses", async () => {
    const newCourseSeeds = extractFields(createRandomCourse(), [
      "title",
      "description",
    ]);

    const response = await authedTestAgent
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

  it("GET /api/v1/courses", async () => {
    const response = await unAuthedTestAgent.get("/api/v1/courses");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: expect.any(Array),
    });
  });

  it("GET /api/v1/courses/:id", async () => {
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

  it("PUT /api/v1/courses:id", async () => {
    const course = coursesData[0];

    const courseId = course!.id;

    const updatedData = {
      title: "This is Updated Course Title",
      description: "Thi is updated course description.",
    };

    const response = await authedTestAgent
      .put(`/api/v1/courses/${courseId}`)
      .send(updatedData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: expect.objectContaining<Partial<Course>>({
        id: courseId,
        title: updatedData.title,
        description: updatedData.description,
      }),
    });
  });

  it("Delete /api/v1/courses:id", async () => {
    const course = coursesData[0];

    const courseId = course!.id;

    const response = await authedTestAgent.delete(
      `/api/v1/courses/${courseId}`
    );

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: expect.objectContaining<Partial<Course>>({
        id: courseId,
      }),
    });
  });
});
