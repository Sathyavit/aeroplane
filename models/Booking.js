import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    passengerName: {
      type: String,
      required: [true, "Passenger name is required"],
      trim: true,
      minlength: 3,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },

    gender: {
      type: String,
      required: [true, "Gender is required"],
    },

    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      match: [/^[6-9]\d{9}$/, "Please enter a valid mobile number"],
    },

    from: {
      type: String,
      required: [true, "Departure city is required"],
      trim: true,
    },

    to: {
      type: String,
      required: [true, "Destination city is required"],
      trim: true,
    },

    date: {
      type: String,
      required: [true, "Travel date is required"],
    },

    flightNumber: {
      type: String,
      required: [true, "Flight number is required"],
    },

    flightTime: {
      type: String,
      required: [true, "Flight time is required"],
    },

    age: {
      type: Number,
      required: [true, "Age is required"],
      min: 1,
      max: 120,
    },

    seatNumber: {
      type: String,
      default: "",
    },

    seatType: {
      type: String,
      default: "",
    },

    seatCharge: {
      type: Number,
      default: 0,
    },

    travelClass: {
      type: String,
      required: [true, "Travel class is required"],
    },

    ticketPrice: {
      type: Number,
      required: [true, "Ticket price is required"],
      min: 1,
    },

    cabinBag: {
      type: String,
      required: [true, "Cabin baggage is required"],
    },

    checkInBag: {
      type: String,
      required: [true, "Check-in baggage is required"],
    },

    pnr: {
      type: String,
      unique: true,
    },

    status: {
      type: String,
      default: "Confirmed",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Booking", bookingSchema);