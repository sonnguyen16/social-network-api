import { ForbidenError } from "../core/error.response.js";
import ApiKeyService from "../services/apikey.service.js";

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}

export const checkApiKey = async (req, res, next) => {
    const key = req.headers[HEADER.API_KEY]?.toString();

    if (!key) throw new ForbidenError('Forbiden')

    const existKey = await ApiKeyService.findById(key)

    if (!existKey) throw new ForbidenError('Forbiden')

    return next()
}