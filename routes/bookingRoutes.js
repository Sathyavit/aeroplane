import express from "express";
import Booking from "../models/Booking.js";
import PassengerTrips from "../models/PassengerTrips.js";

console.log("Schema fields:");
console.log(Object.keys(Booking.schema.paths));
console.log("✅ This is my current bookingRoutes.js FILE");

const router = express.Router();

/* ================= TEST ================= */

router.get("/test", (req, res) => {
  res.send("Booking Route Working");
});

/* ================= CREATE BOOKING ================= */

router.post("/create", async (req, res) => {
  console.log("🔥 Booking Create Route Hit 🔥");
  console.log("===== REQUEST BODY =====");
  console.log(req.body);
  // ================= VALIDATION =================

const {
  passengerName,
  age,
  gender,
  email,
  mobile,
  from,
  to,
  date,
  flightNumber,
  travelClass,
  ticketPrice,
  cabinBag,
  checkInBag,
} = req.body;

if (!passengerName?.trim()) {
  return res.status(400).json({
    error: "Passenger name is required.",
  });
}
if (!/^[A-Za-z ]+$/.test(passengerName.trim())) {
  return res.status(400).json({
    error: "Passenger name should contain only alphabets.",
  });
}

if (!age || age < 1 || age > 120) {
  return res.status(400).json({
    error: "Please enter a valid age.",
  });
}

if (!gender) {
  return res.status(400).json({
    error: "Please select gender.",
  });
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email || "")) {
  return res.status(400).json({
    error: "Please enter a valid email address.",
  });
}

if (!/^[6-9]\d{9}$/.test(mobile || "")) {
  return res.status(400).json({
    error: "Please enter a valid 10-digit mobile number.",
  });
}

if (!from) {
  return res.status(400).json({
    error: "Departure city is required.",
  });
}

if (!to) {
  return res.status(400).json({
    error: "Destination city is required.",
  });
}

if (!/^[A-Za-z ]+$/.test(passengerName.trim())) {
  return res.status(400).json({
    error: "Departure and destination cannot be the same.",
  });
}

if (!date) {
  return res.status(400).json({
    error: "Travel date is required.",
  });
}

if (!flightNumber) {
  return res.status(400).json({
    error: "Flight number is required.",
  });
}

if (!travelClass) {
  return res.status(400).json({
    error: "Travel class is required.",
  });
}

if (!ticketPrice || ticketPrice <= 0) {
  return res.status(400).json({
    error: "Invalid ticket price.",
  });
}

if (!cabinBag) {
  return res.status(400).json({
    error: "Please select cabin baggage.",
  });
}

if (!checkInBag) {
  return res.status(400).json({
    error: "Please select check-in baggage.",
  });
}

  try {
    const pnr =
      "SKY" +
      Math.floor(100000 + Math.random() * 900000);

    

    // Save Booking
    const booking = await Booking.create({
      ...req.body,
      pnr,
      
    });

    /* ================= PASSENGER TRIPS ================= */

    let passenger = await PassengerTrips.findOne({
      userId: booking.userId,
    });

    const trip = {
      passengerName: booking.passengerName,
      age: booking.age,
      email: booking.email,

      from: booking.from,
      to: booking.to,
      date: booking.date,

      flightNumber: booking.flightNumber,

      pnr: booking.pnr,

      seatNumber: booking.seatNumber,
      seatType: booking.seatType,
      seatCharge: booking.seatCharge,

      travelClass: booking.travelClass,
      ticketPrice: booking.ticketPrice,

      cabinBag: booking.cabinBag,
      checkInBag: booking.checkInBag,

      status: booking.status,
    };

    if (passenger) {
      passenger.trips.push(trip);

      await passenger.save();
    } else {
      await PassengerTrips.create({
        userId: booking.userId,

        passengerName: booking.passengerName,

        email: booking.email,

        trips: [trip],
      });
    }

    console.log("===== SAVED BOOKING =====");
    console.log(booking);

    res.status(201).json({
      message: "Booking Confirmed",
      booking,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
            error: error.message,
    });
  }
});

/* ================= GET BOOKINGS OF LOGGED-IN USER ================= */

router.get("/user/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json(bookings);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});
/* ================= UPDATE SEAT ================= */

router.put("/update-seat/:id", async (req, res) => {
  try {

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        seatNumber: req.body.seatNumber,
        seatType: req.body.seatType,
        seatCharge: req.body.seatCharge,
        ticketPrice: req.body.ticketPrice,
      },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        error: "Booking not found",
      });
    }

    res.status(200).json({
      message: "Seat Updated Successfully",
      booking,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

export default router;