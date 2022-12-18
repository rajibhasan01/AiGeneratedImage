// External import
import express from "express";
// Internal import
import { ConfigService } from "../../utilities/service.config";
import { postBodyValidation } from "../../middlewares/validation/validation";
import { fileUpload, writeFileToLocalStorage } from "../../middlewares/common/fileUpload";
import { generateImage, homePage, generateImageVariation } from "../../controllers/dalleAi/controller.dalleAi";

const dalleAiRoute = express.Router();
const config = ConfigService.getInstance().getConfig();

dalleAiRoute.get('/', homePage);
dalleAiRoute.post('/', postBodyValidation, generateImage);
dalleAiRoute.post('/variations', fileUpload.single('file'),  writeFileToLocalStorage, generateImageVariation)

export = dalleAiRoute;