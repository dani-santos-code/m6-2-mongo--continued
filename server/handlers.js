"use strict";
const { MongoClient } = require("mongodb");
const assert = require("assert");

const client = new MongoClient("mongodb://localhost:27017", {
  useUnifiedTopology: true,
});
const getSeats = async (req, res) => {
  await client.connect();
  const db = client.db("mongo2");
  const seats = await db.collection("seats").find().toArray();
  return res.json({ seats: seats, numOfRows: 8, seatsPerRow: 12 });
};

const bookSeat = async (req, res) => {
  try {
    await client.connect();
    const db = client.db("mongo2");
    const r = await db.collection("seats").findOne();
    // assert.equal(1, r.insertedCount);
    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

module.exports = { getSeats, bookSeat };
