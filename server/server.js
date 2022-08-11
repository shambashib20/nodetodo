require("dotenv").config();
const express = require('express');
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

// Connect Database
connectDB();

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