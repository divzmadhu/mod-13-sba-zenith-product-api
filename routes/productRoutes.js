//1.1 Import Express to create API routes
import express from "express";

//1.2 Import the Product model to interact with MongoDB
import Product from "../models/Product.js";

//1.3 Create a router instance
const router = express.Router();


// 2. POST :- Create a new product 
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

//3. GET /api/products/:id (Read a Single Product)
router.get("/:id", async (req, res) => {
    try {
        // 3.1 Get the product ID from the URL
        const product = await Product.findById(req.params.id);

        // 3.2 Check whether the product exists
        if (!product) {
            return res.status(404).json({ message: "Product NOT found!" });
        }

        // 3.3 Return the product if found
        res.status(200).json(product);

    } catch (error) {
        // 3.4 Handle errors during product retrieval
        res.status(400).json({ message: error.message });

    }
});

//4. PUT /api/products/:id (Update a Product)
router.put("/:id", async (req, res) => {
    try {
        // 4.1 Find the product by ID and update it with the request body
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,           
            { returnDocument: "after", runValidators: true }
        );
        // 4.2 Check whether the product exists
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        // 4.3 Return the updated product
        res.status(200).json(updatedProduct);


    } catch (error) {

         // 4.4 Handle errors during product update
        res.status(400).json({ message: error.message });
    }
})

//1.4 Export the router to use it in the main server file
export default router;





