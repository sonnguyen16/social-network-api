import { Types } from "mongoose"
import keytokenModel from "../models/keytoken.model.js"

class KeyTokenService {
    static async createKeyToken({ _id, privateKey, refreshToken }) {
        const keyToken = await keytokenModel.findOneAndUpdate({ user: new Types.ObjectId(_id) },
            { privateKey, refreshToken },
            { upsert: true, new: true })

        return {
            privateKeyString: keyToken.privateKey
        }
    }

    static async findByUserId(user_id) {
        return await keytokenModel.findOne({ user: new Types.ObjectId(user_id) }).lean()
    }

    static async deleteById(keyStore) {
        return await keytokenModel.deleteOne({ _id: new Types.ObjectId(keyStore._id) })
    }
}

export default KeyTokenService