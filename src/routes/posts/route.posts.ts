// External import
import express from "express";

// Internal import
import { generateImage, homePage } from "./../../controllers/post/controller.post";
import { postBodyValidation } from "./../../middlewares/validation/validation";
import { ConfigService } from "../../utilities/service.config";


const config = ConfigService.getInstance().getConfig();


const postRoute = express.Router();


const checkAuth = (req: any, res: any, next: any) => {
    if (req?.session?.userName === config.superadmin.username) {
      next();
    } else {
      res.redirect("auth/login");
      // next();
    }
  };

postRoute.get('/', homePage);
postRoute.post('/', postBodyValidation, generateImage);

export = postRoute;