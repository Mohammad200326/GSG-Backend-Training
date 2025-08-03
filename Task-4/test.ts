import { UserRepository } from "./repositories/UserRepository";
import { CourseRepository } from "./repositories/CourseRepository";
import { BookingRepository } from "./repositories/BookingRepository";

async function testUserRepository() {
  const userRepo = new UserRepository();

  console.log("getAll");
  console.log(await userRepo.getAll());

  console.log("##################");

  console.log("getItemById");
  console.log(await userRepo.getItemById("u2"));

  console.log("##################");

  console.log("addItem");
  console.log(
    await userRepo.addItem({
      id: "u4",
      name: "Firas",
      age: 25,
      email: "Firas@example.com",
      phoneNumber: 123456789,
    })
  );
  console.log(await userRepo.getAll());

  console.log("##################");

  console.log("updateItem");
  console.log(await userRepo.updateItem("u4", { age: 50 }));

  console.log("##################");

  console.log("DeleteItemById");
  console.log(await userRepo.DeleteItemById("u4"));
  console.log(await userRepo.getAll());

  console.log("##################");

  console.log("");
  console.log(await userRepo.findItemsByFilter({ name: "Mohammad" }));
}

async function testCourseRepository() {
  const courseRepo = new CourseRepository();

  console.log("getAll");
  console.log(await courseRepo.getAll());

  console.log("##################");

  console.log("getItemById");
  console.log(await courseRepo.getItemById("c2"));

  console.log("##################");

  console.log("addItem");
  console.log(
    await courseRepo.addItem({
      id: "c4",
      title: "Backend",
      numOfStudents: 20,
      sections: ["Node", "Express", "Nest"],
    })
  );
  console.log(await courseRepo.getAll());

  console.log("##################");

  console.log("updateItem");
  console.log(await courseRepo.updateItem("c4", { numOfStudents: 40 }));

  console.log("##################");

  console.log("DeleteItemById");
  console.log(await courseRepo.DeleteItemById("c4"));
  console.log(await courseRepo.getAll());

  console.log("##################");

  console.log("");
  console.log(await courseRepo.findItemsByFilter({ title: "Next.js" }));
}

async function testBookingRepository() {
  const bookingRepo = new BookingRepository();

  console.log("getAll");
  console.log(await bookingRepo.getAll());

  console.log("##################");

  console.log("getItemById");
  console.log(await bookingRepo.getItemById("b2"));

  console.log("##################");

  console.log("addItem");
  console.log(
    await bookingRepo.addItem({
      id: "b4",
      status: "pending",
      time: new Date("31-07-2025"),
    })
  );
  console.log(await bookingRepo.getAll());

  console.log("##################");

  console.log("updateItem");
  console.log(await bookingRepo.updateItem("b4", { status: "cancelled" }));

  console.log("##################");

  console.log("DeleteItemById");
  console.log(await bookingRepo.DeleteItemById("b4"));
  console.log(await bookingRepo.getAll());

  console.log("##################");

  console.log("");
  console.log(await bookingRepo.findItemsByFilter({ status: "confirmed" }));
}

async function runFullTest() {
  await testUserRepository();
  await testCourseRepository();
  await testBookingRepository();
}

runFullTest();
