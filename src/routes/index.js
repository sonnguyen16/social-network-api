import { Router } from "express"
import authRouter from "./auth/index.js"
import { checkApiKey } from "../middlewares/checkapikey.middleware.js"
import { asyncHandler } from "../utils/errorhandle.js"

const router = Router()

// router.use(asyncHandler(checkApiKey))
router.use('/', authRouter)

export default router