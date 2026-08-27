import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const { from, to } = req.query;

    const response = await axios.get(
      "http://api.aviationstack.com/v1/flights",
      {
        params: {
          access_key: process.env.AVIATIONSTACK_API_KEY,
        },
      }
    );

    const flights = response.data.data.filter(
      (flight) =>
        flight.departure?.iata === from &&
        flight.arrival?.iata === to
    );

    res.json(flights);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Unable to fetch flights",
    });
  }
});

export default router;