import { CREATED, SuccessResponse } from "../core/success.response.js"
import AuthService from "../services/auth.service.js"

class AuthController {
    signUp = async (req, res, next) => {
        const data = await AuthService.signUp(req.body)
        new CREATED({
            message: 'Register Successfully!',
            metadata: data
        }).send(res)
    }

    login = async (req, res, next) => {
        const data = await AuthService.login(req.body)
        new SuccessResponse({
            message: 'Login Successfully!',
            metadata: data
        }).send(res)
    }

    logout = async (req, res, next) => {
        const data = await AuthService.logout(req.keyStore)
        new SuccessResponse({
            message: 'Logout Successfully!',
            metadata: data
        }).send(res)
    }
}

export default new AuthController()