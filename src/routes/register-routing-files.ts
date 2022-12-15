// External import
import express from "express";

// Internal import
import postRoute from "./posts/route.posts";
import loginRoute from "./login/route.login";
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
            req.session.error = "Invalid Token.";
            res.redirect('/auth/login');
        }
    } catch (err){
        req.session.error = "Invalid Token.";
        res.redirect('/auth/login');
    }
};

registeredRouters.use("/auth", loginRoute);
registeredRouters.use("/", checkAuth, postRoute);


export = registeredRouters;