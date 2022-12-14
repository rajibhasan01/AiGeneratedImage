// External import
import express from "express";

// Internal import
import homeRoute from "./home/route.home";
import postRoute from "./posts/route.posts";

// Create a new router object
const registeredRouters = express.Router();


registeredRouters.use("/", homeRoute);
registeredRouters.use("/post", postRoute);

export = registeredRouters;