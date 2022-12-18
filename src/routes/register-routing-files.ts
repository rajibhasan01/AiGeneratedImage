// External import
import express from "express";

// Internal import
import loginRoute from "./login/route.login";
import dalleAiRoute from "./dalleAi/route.dalleAi";
import { JwtAuthentication } from "../middlewares/common/jwt.varification";

// Create a new router object
const registeredRouters = express.Router();

const jwt = JwtAuthentication.getInstance();

const checkAuth = async (req: any, res: any, next: any) => {
    try{
        const token = req?.session?.accessToken;
        const isValidToken: any = await jwt.checkEjsToken(token).catch((error) => {
            throw error;
        });
        if(isValidToken) {
            req.session.user = isValidToken?.username;
            next();
        } else {
            res.redirect('/auth/login');
        }
    } catch (err){
        res.redirect('/auth/login');
    }
};

registeredRouters.use("/auth", loginRoute);
registeredRouters.use("/", dalleAiRoute);


export = registeredRouters;