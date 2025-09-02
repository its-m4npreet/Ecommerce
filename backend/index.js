require("dotenv").config();
const express = require("express");
// const { userRouter } = require("./routes/user.route");
const app = express();
const { connection } = require("./configs/db");
const cors = require("cors");
// const { productRouter } = require("./routes/blog.route");
// Load environment variables from .env file

const port = process.env.PORT;
app.use(cors());
app.use(express.json());
// app.use("/user", userRouter);
// app.use("/api/product", productRouter);
app.get("/", (req, res) => {
  res.send("Welcome to E-commerce Backend 😁");
});

app.listen(port, async () => {
  try {
    console.log("DB Connecting...");
    await connection;
    console.log("DB Connected!");
    console.log(`Server is running on port http://localhost:${port}`);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
});
