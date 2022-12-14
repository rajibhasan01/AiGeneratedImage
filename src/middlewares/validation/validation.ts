// External imports
import { check } from "express-validator";

export const postBodyValidation: any = [
    check("prompt")
    .isString()
    .withMessage("The prompt must be text")
]