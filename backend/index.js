const express = require("express");
const cors = require("cors");
const path = require("path");
const DisplayData = require("./Routes/DisplayData");
const Orderdata = require("./Routes/Orderdata");
require("./db");

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

// Middleware
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/api",require("./Routes/DisplayData")); 
app.use('/api', require('./Routes/Orderdata'));
app.use('/api', require('./Routes/CreateUser')); 
app.use('/api', require("./Routes/paymentRoutes"));
app.use(express.static(path.join(__dirname, "../frontend/build"))); // Adjusted path

// Fallback to serve index.html for any other requests
app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html")); // Adjusted path
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
