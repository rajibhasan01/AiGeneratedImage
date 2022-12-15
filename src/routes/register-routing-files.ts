// External import
import express from "express";

// Internal import
import postRoute from "./posts/route.posts";
import loginRoute from "./login/route.login";

// Create a new router object
const registeredRouters = express.Router();


registeredRouters.use("/", postRoute);
registeredRouters.use("/auth", loginRoute);

export = registeredRouters;