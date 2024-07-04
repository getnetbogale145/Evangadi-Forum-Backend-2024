require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const port = 5500;

// Configure CORS middleware
app.use(
  cors({
    origin: "https://evangadi-forum-getnet.netlify.app",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// DB connection
const dbConnection = require("./db/dbConfig");

// User routes middleware file
const userRoutes = require("./routes/userRoute");

// Questions routes middleware file
const questionsRoutes = require("./routes/questionRoute");

// Answers routes middleware file
const answerRoutes = require("./routes/answerRoute");

// Authentication middleware file
const authMiddleware = require("./middleware/authMiddleWare");

// JSON middleware to extract JSON data
app.use(express.json());

// Welcome route
app.get("/", (req, res) => {
  res.send("Welcome to the Evangadi-Forum APP");
});

// User routes middleware
app.use("/api/users", userRoutes);

// Question routes middleware
app.use("/api/questions", authMiddleware, questionsRoutes);

// Answer routes middleware
app.use("/api/answers", authMiddleware, answerRoutes);

async function start() {
  try {
    const result = await dbConnection.execute("Select 'test' ");
    await app.listen(port, () => {
      console.log("Server is listening at port 5500");
    });
    console.log("Database connection established");
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

start();
