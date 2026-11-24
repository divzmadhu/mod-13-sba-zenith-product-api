// 1.1 Load environment variables from the .env file into process.env
import 'dotenv/config';
// 1.2 Import Express to create the web server and handle HTTP routes
import express from 'express';
//1.3 import  from connection.js
import connectDB from './config/connection.js';
//1.4 Import product routes to connect product API endpoints to the main server
import productRoutes from "./routes/productRoutes.js";



// 2.1 Create the Express application instance
const app = express();


// 2.2 Set the port number the server will listen on
const port = 3000;


// 2.3 Middleware to parse incoming JSON request bodies and make the data available in req.body
app.use(express.json());

// 2.4 Mount product routes under the /api/products path
app.use("/api/products", productRoutes);

// 3. Define the server startup function
const startServer = async () => {
  try {
    //3.1 Connect to MongoDB before starting the server
    await connectDB();

    //3.2 Start listening fro incoming HTTP requests
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
    
  } catch (error) {

    // 3.3 Handle errors if the database connection fails
    console.error("Unable to start the server", error.message);
    process.exit(1);
  }
};

// 4. Define a basic GET route to check whether the server is running
app.get("/", (req, res) => {
  res.send("Server is started and running.");
  console.log("Server is started and running");
})

// 5. Start the application
startServer();