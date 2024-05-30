import AuthService from "../services/auth.service.js"

class AuthController {
    signUp = async (req, res, next) => {
        try {
            const data = await AuthService.signUp(req.body)
            return res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }
}

export default new AuthController()