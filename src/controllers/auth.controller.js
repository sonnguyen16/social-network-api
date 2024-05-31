import { CREATED } from "../core/success.response.js"
import AuthService from "../services/auth.service.js"

class AuthController {
    signUp = async (req, res, next) => {
        const data = await AuthService.signUp(req.body)
        new CREATED({
            message: 'Register Successfully!',
            metadata: data
        }).send(res)
    }
}

export default new AuthController()