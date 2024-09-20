const express = require("express");
const cors = require("cors");
const testRoute = require("./routes/testRoute")
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

app.use(express.json());

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("MongoDB Connection failed", error);
    process.exit(1); // Exit the application if the connection fails
  }
}

connectDB();

app.use('/api', testRoute,);
app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
  console.log(`Listening at port: ${PORT}`);
});