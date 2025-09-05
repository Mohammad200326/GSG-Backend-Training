import type { Request, Response } from "express";
import { courseService } from "./course.service.js";
import type { Course } from "./course.entity.js";

export class CourseController {
  private service = courseService;

  getCourses = (req: Request, res: Response) => {
    const courses = this.service.getCourses();
    res.status(200).json(courses);
  };

  getCourse = (req: Request<{ id: string }>, res: Response) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "ID required" });

    const course = this.service.getCourse(id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json(course);
  };

  createCourse = (req: Request, res: Response) => {
    const { title, description, creatorId } = req.body;

    if (!title || !description || !creatorId) {
      return res.status(400).json({
        error: "Title, description, and creatorId are required",
      });
    }

    const courseData = { title, description, creatorId };
    const newCourse: Course = this.service.createCourse(courseData);

    return res.status(201).json(newCourse);
  };

  updateCourse = (req: Request<{ id: string }>, res: Response) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "ID required" });

    const { title, description } = req.body;

    const updated = this.service.updateCourse(id, { title, description });
    if (!updated) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json(updated);
  };

  deleteCourse = (req: Request<{ id: string }>, res: Response) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "ID required" });

    const deleted = this.service.deleteCourse(id);
    if (!deleted) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(204).send();
  };
}
