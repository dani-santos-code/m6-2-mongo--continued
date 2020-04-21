"use strict";
const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://localhost:27017", {
  useUnifiedTopology: true,
});
const getSeats = async (req, res) => {
  try {
    await client.connect();
    const db = client.db("mongo2");
    const seats = await db.collection("seats").find().toArray();
    res.status(200).send(seats);
  } catch (e) {
    res.status(404).send(e);
  }
};

const bookSeat = async (req, res) => {};

module.exports = { getSeats, bookSeat };
