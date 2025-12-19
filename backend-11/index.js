const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());


const admin = require("firebase-admin");

const decoded = Buffer.from(process.env.FB_SERVICE_KEY, 'base64').toString('utf8')
const serviceAccount = JSON.parse(decoded);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const verifyFBToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ message: 'unauthorize access' })
  }

  try {
    const idToken = token.split(' ')[1]
    const decoded = await admin.auth().verifyIdToken(idToken)
    console.log('decoded info', decoded);
    req.decoded_email = decoded.email;
    next();
  }
  catch (error) {
    return res.status(401).send({ message: 'unauthorize access' })
  }

}

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
    const requestCollection = database.collection("requests");

    app.post("/users", async (req, res) => {
      const userInfo = req.body;
      userInfo.createAt = new Date();
      userInfo.role = "donor"
      userInfo.status = "active"
      const result = await userCollection.insertOne(userInfo);
      res.send(result);
      console.log(userInfo);
    });

    app.get("/users", verifyFBToken, async (req, res) => {
      const result = await userCollection.find().toArray();
      res.status(200).send(result)

    })

    // current user email
    app.get("/users/role/:email", async (req, res) => {
      const { email } = req.params;
      const query = { email: email };
      const result = await userCollection.findOne(query);
      res.send(result);
    });

    // update user status
    app.patch('/update/users/status', async (req, res) => {
      const { email, status } = req.query;
      const query = { email: email }

      const updateStatus = {
        $set: {
          status: status
        }
      }

      const result = await userCollection.updateOne(query, updateStatus)
      res.send(result)
    })

    // new request add
    app.post('/requests', verifyFBToken, async (req, res) => {
      const data = req.body;
      data.createAt = new Date()
      const result = await requestCollection.insertOne(data)
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
