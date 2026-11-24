//1.1 Import Express to create API routes
import express from "express";

//1.2 Import the Product model to interact with MongoDB
import Product from "../models/Product.js";

//1.3 Create a router instance
const router = express.Router();

//1.4 Export the router to use it in the main server file
export default router;

// 2. Create a new product
router.post("/", async (req, res) => {
  try {
    // 2.1 Create a product using the data received in the request body
    const newProduct = await Product.create(req.body);

    // 2.2 Send the newly created product with HTTP status 201
    res.status(201).json(newProduct);

  } catch (error) {
    // 2.3 Handle errors during product creation
    res.status(400).json({ message: error.message });
  }
});



