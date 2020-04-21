// const fs = require("file-system");
const { MongoClient } = require("mongodb");
const assert = require("assert");
const { seats } = require("./seats");

const client = new MongoClient("mongodb://localhost:27017", {
  useUnifiedTopology: true,
});

const batchImport = async () => {
  try {
    await client.connect();
    const db = client.db("mongo2");
    const r = await db.collection("seats").insertMany(seats);
    assert.strictEqual(Object.keys(seats).length, r.insertedCount);
  } catch (e) {
    console.log(e.stack);
  }
};

batchImport().then(() => {
  console.log("Data successfully inserted.");
  client.close();
  return;
});
