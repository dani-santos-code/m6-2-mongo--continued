"use strict";
const { MongoClient } = require("mongodb");
const assert = require("assert");

const client = new MongoClient("mongodb://localhost:27017", {
  useUnifiedTopology: true,
});

const getSeats = async (req, res) => {
  try {
    await client.connect();
    const db = client.db("mongo2");
    const seats = await db.collection("seats").find().toArray();
    return res.json({ seats: seats, numOfRows: 8, seatsPerRow: 12 });
  } catch (e) {
    res.status(500).json({ status: 500, message: e.message });
  }
};

const bookSeat = async (req, res) => {
  const { fullName, seatId, email, creditCard, expiration } = req.body;
  const newValues = { $set: { isBooked: true } };
  try {
    if (creditCard.length > 13 && expiration.length === 4) {
      await client.connect();
      const db = client.db("mongo2");
      await db.collection("seats").findOneAndUpdate({ _id: seatId }, newValues);
      const found = await db.collection("users").findOne({ email });
      if (!found) {
        await db.collection("users").insertOne({ fullName, email, seatId });
      }
      res.status(201).json({ status: 201, data: req.body });
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

module.exports = { getSeats, bookSeat };
