import apikeyModel from "../models/apikey.model.js"
import crypto from 'crypto'

class ApiKeyService {
    static findById = async (key) => {
        const apiKey = await apikeyModel.findOne({ key, status: true }).lean()
        return apiKey
    }
}

export default ApiKeyService