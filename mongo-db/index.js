import express, { json } from "express";
import { connect, Schema, model, startSession } from "mongoose";

const app = express();

app.use(json());

// MongoDB Connection
connect("mongodb://mongo:27017/?replicaSet=rs0")
  .then(() => console.log("Connected to MongoDB Replica Set"))
  .catch((err) => {

    console.error("MongoDB Connection Error:", err.message);

    console.error("Error Stack:", err.stack);
  });

// Account Schema & Model
const accountSchema = new Schema({
  name: { type: String, required: true },
  balance: { type: Number, required: true },
});

const Account = model("Account", accountSchema);

// Insert sample accounts
const seedAccounts = async () => {
  try {

    await Account.deleteMany(); // Clear existing data

    const accounts = [
      { name: "Alice", balance: 5000 },
      { name: "Bob", balance: 3000 },
      { name: "Charlie", balance: 7000 },
    ];

    await Account.insertMany(accounts);

    console.log("Accounts added successfully");
  } 
  catch (error) {

    console.error("Error adding accounts:", error);
  }
};

seedAccounts();

// Get all accounts
app.get("/accounts", async (req, res) => {
  try {
    
    const accounts = await Account.find();

    res.json(accounts);
  } 
  catch (error) {

    res.status(500).json({ error: "Failed to fetch accounts" });
  }
});

// Transfer route
app.post("/transfer", async (req, res) => {

  try {

    const { from, to, amount } = req.body;

    const session = await startSession();
    
    session.startTransaction();

    const sender = await Account.findOne({ name: from }).session(session);

    const receiver = await Account.findOne({ name: to }).session(session);

    if (!sender || !receiver) throw new Error("Invalid accounts");

    if (sender.balance < amount) throw new Error("Insufficient balance");

    sender.balance -= amount;

    receiver.balance += amount;

    await sender.save({ session });

    await receiver.save({ session });

    await session.commitTransaction();

    session.endSession();

    res.json({ message: "Transfer successful" });
  } 
  catch (error) {

    await session.abortTransaction();

    session.endSession();

    res.status(400).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("Server is running on port 3000"));
