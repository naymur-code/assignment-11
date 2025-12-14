const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.cyslekw.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    const database = client.db("backend11DB");
    const userCollection = database.collection("users");
    const productCollection = database.collection("products");

    app.post("/users", async (req, res) => {
      const userInfo = req.body;
      userInfo.createAt = new Date();
      const result = await userCollection.insertOne(userInfo);
      res.send(result);
      console.log(userInfo);
    });

    app.get("/users/role/:email", async (req, res) => {
      const { email } = req.params;
      const query = { email: email };
      const result = await userCollection.findOne(query);
      res.send(result);
    });

    // new product add
    app.post('/products', async (req, res) => {
      const data = req.body;
      data.createAt = new Date()
      const result = await productCollection.insertOne(data)
      res.send(result)
      console.log(data);
    })

    // show all products
    app.get('/manager/products/:email', async (req, res) => {
      const { email } = req.params;

      const query = {
        mangerEmail: email
      }
      const result = await productCollection.find().toArray()
      res.send(result)

      console.log(query);

    })


    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("hello world!");
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
