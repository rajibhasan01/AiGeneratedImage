// External import
import express from "express";
// Internal import
import { ConfigService } from "../../utilities/service.config";
import { postBodyValidation } from "../../middlewares/validation/validation";
import { fileUpload, writeFilesToLocalStorage, writeFileToLocalStorage } from "../../middlewares/common/fileUpload";
import { generateImage, homePage, generateImageVariation, imageVariationPage, imageEdit, imageEditWithPrompt } from "../../controllers/dalleAi/controller.dalleAi";

const dalleAiRoute = express.Router();
const config = ConfigService.getInstance().getConfig();

dalleAiRoute.get('/', homePage);
dalleAiRoute.post('/', postBodyValidation, generateImage);

dalleAiRoute.get('/variations', imageVariationPage);
dalleAiRoute.post('/variations', fileUpload.single('file'),  writeFileToLocalStorage, generateImageVariation);

dalleAiRoute.get('/edit-image', imageEdit);
dalleAiRoute.post('/edit-image', fileUpload.fields([{name: 'file', maxCount: 1}, {name: 'maskImg'}]),  writeFilesToLocalStorage, imageEditWithPrompt);

export = dalleAiRoute;