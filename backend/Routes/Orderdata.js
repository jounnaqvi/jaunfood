const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/orderdata", async (req, res) => {
  try {
    const { order_data, order_date, email } = req.body;

    if (!order_data || !order_date || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    order_data.splice(0, 0, { Order_date: order_date });

    let existingOrder = await Order.findOne({ email });

    if (!existingOrder) {
      await Order.create({
        email,
        order_data: [order_data],
      });
    } else {
      await Order.findOneAndUpdate({ email }, { $push: { order_data } });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Server Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});
router.post("/myorderData", async (req, res) => {
  try {
    let myData = await Order.findOne({ email: req.body.email });
    res.json({ orderData: myData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
