require("dotenv").config();
const express = require('express');
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

// Connect Database
connectDB();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000")
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  )
  next()
})

// app.use(cors());

// routes
const todo = require("./routes/todo"); // added

// initialise the middlewares
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("Server up and running"));

// use routes
app.use("/api/todo", todo); // added

// setting up port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});