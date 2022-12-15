// External import
import express from "express";

// Internal import
import { generateImage, homePage } from "./../../controllers/post/controller.post";
import { postBodyValidation } from "./../../middlewares/validation/validation";
import { ConfigService } from "../../utilities/service.config";


const config = ConfigService.getInstance().getConfig();


const postRoute = express.Router();


postRoute.get('/', homePage);
postRoute.post('/', postBodyValidation, generateImage);

export = postRoute;