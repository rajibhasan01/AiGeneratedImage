// External import
import express from "express";

// Internal import
import { generateImage, homePage } from "../../controllers/dalleAi/controller.dalleAi";
import { postBodyValidation } from "../../middlewares/validation/validation";
import { ConfigService } from "../../utilities/service.config";


const config = ConfigService.getInstance().getConfig();


const dalleAiRoute = express.Router();


dalleAiRoute.get('/', homePage);
dalleAiRoute.post('/', postBodyValidation, generateImage);

export = dalleAiRoute;