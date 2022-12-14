// External imports
import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { ConfigService } from "../../utilities/service.config";

const config = ConfigService.getInstance().getConfig();
const authRoutes = express.Router();
