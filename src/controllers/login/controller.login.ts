// External import
import { validationResult } from "express-validator";

// Internal import
import { Login } from "../../model/model.login";
import { LoginService } from "../../services/login/service.login";

const loginService = LoginService.getInstance();

/**
 * admin login
 */
export const loginPage = async (req: any, res: any) => {
    let error = false;
    if (typeof req.session !== undefined) {
        error = req?.session?.error;
        delete req?.session?.error;
    }
    res.render("pages/login.ejs", { title: "Login", error });
}


export const adminLogin = async (req: Request & { body: Login }, res: any) => {
    const data: Login = req.body;

    try {
        const error = validationResult(req).formatWith(({ msg }) => msg);
        const hasError = !error.isEmpty();
        if (hasError) {
          res.status(422).json({ status: 422, message: error.array().join(', ') });
        } else {
            const result = await loginService.userLogin(data).catch((err) => {
                throw error;
            });
            if(result){
                res.status(200).json(result);
            }
            // Write code here
        }
      } catch (error) {
        res.status(403).json({status: 403, message: "Select different words" });
      }
};

export const adminLogout = async (req: any, res: any) => {
    // req.session.destroy();
    res.redirect('/auth/login')
}
