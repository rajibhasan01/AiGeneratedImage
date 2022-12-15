// External imports
import { check } from "express-validator";

export const postBodyValidation: any = [
    check("prompt")
    .isString()
    .withMessage("The prompt must be text")
]

export const loginBodyValidation: any = [
    check('username')
    .isString()
    .withMessage("The user name should be a string")
    .isEmail()
    .withMessage("User name should be an email address"),

    check('password')
    .isLength({ min: 5 })
    .withMessage("Password min length should 5")
]