require("dotenv").config();

const express = require("express");
const app = express();
const port = 5500;

const cors = require("cors");
app.use(
  cors({
    origin: true,
  })
);

// db connection
const dbConnection = require("./db/dbConfig");

// user routes middleware file
const userRoutes = require("./routes/userRoute");

// questions routes middleware file
const questionsRoutes = require("./routes/questionRoute");

// answers routes middleware file
const answerRoutes = require("./routes/answerRoute");

// authentication Middleware file
const authMiddleware = require("./middleware/authMiddleWare");

// Json middleware to extract json data
app.use(express.json());

// Welcome route
app.get("/", (req, res) => {
  res.send(`Welcome to the Evangadi-Forum APP`);
});

// user routes middleware
app.use("/api/users", userRoutes);

// question routes middleware
app.use("/api/questions", authMiddleware, questionsRoutes);

// answer routes middleware
app.use("/api/answers", authMiddleware, answerRoutes);

// updated
async function start() {
  try {
    const result = await dbConnection.query("SELECT 'test'");
    await app.listen(port, () => {
      console.log("Server is listening at port 5500");
    });
    console.log("Database connection established");
  } catch (error) {
    console.error("Error starting server:", error.message);
    if (error.code === "ECONNREFUSED") {
      console.error(
        "Database connection was refused. Please check if the database server is running."
      );
    }
  }
}

start();
