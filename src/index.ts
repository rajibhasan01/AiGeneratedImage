// External imports
import cors from "cors";
import path from 'path';
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

// Internal imports
import registeredRouters from "./routes/register-routing-files";
import { options } from "./middlewares/common/cors";

const app = express();
const port = process.env.PORT || 5000; // Default port to listen
// Define a route handler for the default home page
app.use(express.json({limit: '50mb'})); // Support json encoded bodies upto 50 mb
app.use(express.urlencoded({ extended: true, limit: '50mb'})); // Support encoded bodies
app.use(cors(options));
dotenv.config();

app.set('views', "views");

// Set static folder
app.use(express.static("Uploaded-image"));

// Parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// Routing setup
app.use('/', registeredRouters);

// Start the Express server
app.listen(port, ()=> {
    // tslint: disable-next-line:no-console
    console.log(`Server started at http://localhost:${port}`);
});