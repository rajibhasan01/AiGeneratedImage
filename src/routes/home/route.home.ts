// External import
import express from "express";


// Internal import
import { getHomePage } from "./../../controllers/home/controller.home";

const homeRoute = express.Router();

homeRoute.get('/', getHomePage);

export = homeRoute;