// External import
import express from "express";

// Internal import
import { generateImage } from "./../../controllers/post/controller.post";
import { postBodyValidation } from "./../../middlewares/validation/validation";


const postRoute = express.Router();

postRoute.post('/generate', postBodyValidation, generateImage);

export = postRoute;