import { Router } from "express"
import authRouter from "./auth/index.js"
import { checkApiKey } from "../middlewares/checkapikey.middleware.js"

const router = Router()

router.use(checkApiKey)
router.use('/', authRouter)

export default router