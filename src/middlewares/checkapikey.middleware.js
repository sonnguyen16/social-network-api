import ApiKeyService from "../services/apikey.service.js";

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}

export const checkApiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();

        if (!key) {
            return res.status(401).json({
                message: 'Forbiden Error'
            })
        }

        const existKey = await ApiKeyService.findById(key)

        if (!existKey) {
            return res.status(401).json({
                message: 'Forbiden Error'
            })
        }

        return next()
    } catch (error) {
        return next(error)
    }
}