const express = require("express");
const mongodb = require("mongodb");
const { exit } = require("process");

const app = express();

const mongoClient = new mongodb.MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;

async function connectToDatabase() {
  await mongoClient.connect();
  db = mongoClient.db(process.env.MONGO_DB_NAME);
}

app.use(express.json());

// Campaign endpoints

app.get("/api/marketing/campaign/getAll", async (req, res) => {
  const campaigns = await db.collection("Campaign").find().toArray();
  res.json(campaigns);
});

app.post("/api/marketing/campaign/create", async (req, res) => {
  const campaign = req.body;
  const result = await db.collection("Campaign").insertOne(campaign);
  res.json(result);
});

app.get("/api/marketing/campaign/get/:id", async (req, res) => {
  const campaign = await db
    .collection("Campaign")
    .findOne({ _id: new mongodb.ObjectId(req.params.id) });
  res.json(campaign);
});

// Lead endpoints

app.get("/api/marketing/lead/getAll", async (req, res) => {
  const leads = await db.collection("Lead").find().toArray();
  res.json(leads);
});

app.post("/api/marketing/lead/create", async (req, res) => {
  const lead = req.body;
  const result = await db.collection("Lead").insertOne(lead);
  res.json(result);
});

app.get("/api/marketing/lead/get/:id", async (req, res) => {
  const lead = await db
    .collection("Lead")
    .findOne({ _id: new mongodb.ObjectId(req.params.id) });
  res.json(lead);
});

app.get("/api/marketing/lead/campaign/:campaignId", async (req, res) => {
    console.log(req.params.campaignId);
  const leads = await db
    .collection("Lead")
    .find({ CampaignId: req.params.campaignId })
    .toArray();
  res.json(leads);
});

(async () => {
  await connectToDatabase();
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
})();
