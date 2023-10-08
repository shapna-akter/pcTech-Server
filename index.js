require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qlhnchw.mongodb.net/pcBuilder?retryWrites=true&w=majority`;

// Define MongoDB client outside the run function so we can reuse it.
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the MongoDB client before registering route handlers
    await client.connect();
    console.log("Connected to MongoDB");

    // collections
    const collection = client.db("pcBuilder").collection("components");
    const categories = client.db("pcBuilder").collection("categories");

    // general/initial api
    app.get("/", (req, res) => {
      res.send("hello world");
    });

    // get all components data
    app.get("/pc", async (req, res) => {
      const query = {};
      const options = collection.find(query);
      const result = await options.toArray();
      res.send(result);
    });

    // load data based on component name
    app.get("/cpu", async (req, res) => {
      const pcData = collection.find({
        category: "CPU / Processor",
      });
      const result = await pcData.toArray();
      res.send(result);
    });
    app.get("/motherboard", async (req, res) => {
      const pcData = collection.find({
        category: "Motherboard",
      });
      const result = await pcData.toArray();
      res.send(result);
    });
    app.get("/ram", async (req, res) => {
      const pcData = collection.find({
        category: "RAM",
      });
      const result = await pcData.toArray();
      res.send(result);
    });
    app.get("/psu", async (req, res) => {
      const pcData = collection.find({
        category: "PSU",
      });
      const result = await pcData.toArray();
      res.send(result);
    });
    app.get("/storage", async (req, res) => {
      const pcData = collection.find({
        category: "Storage Device",
      });
      const result = await pcData.toArray();
      res.send(result);
    });
    app.get("/monitor", async (req, res) => {
      const pcData = collection.find({
        category: "Monitor",
      });
      const result = await pcData.toArray();
      res.send(result);
    });
    app.get("/others", async (req, res) => {
      const pcData = collection.find({
        category: "Others",
      });
      const result = await pcData.toArray();
      res.send(result);
    });

    // get a specific product details
    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const pcData = await collection.findOne({ _id: new ObjectId(id) });
      res.send(pcData);
    });

    // get all builder components data
    app.get("/builder-data", async (req, res) => {
      const query = {};
      const options = categories.find(query);
      const result = await options.toArray();
      console.log(result, "hello");
      res.send(result);
    });

    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

run().catch(console.dir);
