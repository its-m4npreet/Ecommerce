require("dotenv").config();
const express = require("express");
// const { userRouter } = require("./routes/user.route");
const app = express();
const { connection } = require("./configs/db");
const cors = require("cors");
const { userRouter } = require("./routes/user.route.js");

const port = process.env.PORT;
app.use(cors());
app.use(express.json());

// app.use("/api/product", productRouter);
app.get("/", (req, res) => {
  res.send("Welcome to E-commerce Backend 😁");
});
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// auth route

app.use("/auth", userRouter);



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
