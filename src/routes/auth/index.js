import { Router } from "express"
import authController from "../../controllers/auth.controller.js"
import { asyncHandler } from "../../utils/errorhandle.js"
import { authentication } from "../../middlewares/authentication.middleware.js"

const authRouter = Router()

authRouter.post(`/signup`, asyncHandler(authController.signUp))
authRouter.post(`/login`, asyncHandler(authController.login))

authRouter.use(asyncHandler(authentication))

authRouter.post(`/logout`, asyncHandler(authController.logout))

export default authRouter