// Import Mongoose to define the product schema and model
import mongoose from "mongoose";

// Define the structure and validation rules for a product
const productSchema = new mongoose.Schema({
    // Product name is required
    name: {
        type: String,
        required: true
    },
     // Product description is required
    description: {
        type: String,
        required: true
    },
    // Product price is required and must be greater than 0
    price: {
        type: Number,
        required: true,
        min: [0.01, "Price must be greater than 0"]
    },
     // Product category is required
    category: {
        type: String,
        required: true
    },

    // Indicates product availability; defaults to true
    inStock: {
        type: Boolean,
        default: true
    },

    // Stores multiple tags associated with the product
    tags: {
        type: [String]
    },

    // Automatically records the date and time when the product is created
    createdAt: {
        type: Date,
        default: Date.now
    }
});


// Compile the schema into a Mongoose model named Product
const Product = mongoose.model("Product", productSchema);

// Export the model to use in other files
export default Product;