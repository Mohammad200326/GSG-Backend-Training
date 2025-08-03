import { BaseRepository } from "./BaseRepository";
import { Booking } from "../models/Booking";

export class BookingRepository extends BaseRepository<Booking> {
  constructor() {
    const initialBookings: Booking[] = [
      {
        id: "b1",
        time: new Date("25-07-2025"),
        status: "confirmed",
      },
      {
        id: "b2",
        time: new Date("27-07-2025"),
        status: "pending",
      },
      {
        id: "b3",
        time: new Date("29-07-2025"),
        status: "cancelled",
      },
    ];
    super(initialBookings);
  }
}
