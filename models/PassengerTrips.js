import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  passengerName: String,
  age: Number,
  email: String,

  from: String,
  to: String,
  date: String,

  flightNumber: String,
  pnr: String,

  seatNumber: String,
  seatType: String,
  seatCharge: Number,

  travelClass: String,
  ticketPrice: Number,

  cabinBag: String,
  checkInBag: String,

  status: {
    type: String,
    default: "Confirmed",
  },
});

const passengerTripsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  passengerName: String,

  email: String,

  trips: [tripSchema],
});

export default mongoose.model(
  "PassengerTrips",
  passengerTripsSchema
);