// External import
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

// Internal imports
import { IAuthService } from "./../../interfaces/IAuthService";
import { ConfigService } from "../../utilities/service.config";


const config = ConfigService.getInstance().getConfig();


dotenv.config();
const tokenSecret = process.env.ACCESSS_TOKEN_SECRET;

export class JwtAuthentication implements IAuthService{
    private static jwtAuth : JwtAuthentication;
    private constructor(){};

    static getInstance(){
        if(!JwtAuthentication.jwtAuth){
            JwtAuthentication.jwtAuth = new JwtAuthentication();
        }
        return JwtAuthentication.jwtAuth;
    }

    // Create Token
    public async createToken(userObject: any) {
        return new Promise((resolve, reject) => {
            jwt.sign(
                userObject, tokenSecret, { expiresIn: '1day' }, (err, token) => {
                    if(err) {
                        reject({
                            status: 403,
                            message: "Wrong user given"
                        });
                    } else {
                        resolve({
                            status: 200,
                            message: "token created",
                            token
                        });
                    }
                }
            );
        }).catch((error) => {
            console.log('Jwt.varification.ts createToken error: ', error);
            throw error;
        });
    };

    // Verify token
    public async verifyToken(token: any) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, tokenSecret, (verificationError: any, authData:any) => {
                if(verificationError){
                    reject({
                        status: 403,
                        message: "verification error"
                    });
                } else {
                    resolve({
                        status: 200,
                        message: "authenticated",
                        data: { authData }
                    })
                }
            })
        }).catch((error) => {
            console.log('Jwt.varification.ts verify error: ', error);
            throw error;
        });
    };

    // Get user info by token
    public async getUserByToken(token: string){
        return new Promise((resolve, reject) => {
            this.verifyToken(token).then((tokenData: any) => {
                // get user
            }).catch((error) => {
                reject(error);
            })
        }).catch((error) => {
            console.log("Jwt.varification.ts getUserByToken error: ", error);
            throw error;
        })
    };

    // Authenticate User
    public async authenticateUser(req: any, res: any, next: any){
        const reqHeader = req.headers.authorization;

        if (typeof reqHeader !== 'undefined'){
            req.token = reqHeader;
            jwt.verify(reqHeader, tokenSecret, (error: any, authData: any) => {
                if(error){
                    res.status(200).json({
                        "status": 403,
                        "message": "invalid token"
                    })
                } else {
                    req.authData = authData;
                    next();
                }
            });
        } else {
            res.status(200).json({
                "status": 403,
                "message": "invalid token"
            })
        };
    }
}