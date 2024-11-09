const mongoose = require("mongoose");

async function fetchData() {
  try {
    await mongoose.connect("mongodb://127.0.0.1/users");
    console.log("Connection is established successfully");

    const fetchedData = await mongoose.connection.db.collection("food_items").find({}).toArray();
    global.food = {};  // Initialize the global food object if it doesn't exist
    global.food_items = fetchedData;
    console.log(fetchedData[0].foodItems,"28")

    console.log("Data fetched and stored globally");
  } catch (err) {
    console.error("No connection or error fetching data:", err);
  }
}

fetchData();
