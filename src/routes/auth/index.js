import { Router } from "express"
import authController from "../../controllers/auth.controller.js"
import { asyncHandler } from "../../utils/errorhandle.js"

const authRouter = Router()

authRouter.post(`/signup`, asyncHandler(authController.signUp))

export default authRouter