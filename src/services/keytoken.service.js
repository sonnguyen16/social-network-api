import keytokenModel from "../models/keytoken.model.js"

class KeyTokenService {
    static async createKeyToken({ _id, publicKey, privateKey }) {
        try {
            const publicKeyString = publicKey.toString()
            const privateKeyString = privateKey.toString()
            const keyToken = await keytokenModel.create({
                user: _id, publicKey: publicKeyString, privateKey: privateKeyString
            })

            return {
                publicKeyString: keyToken.publicKey,
                privateKeyString: keyToken.privateKey
            }
        } catch (error) {
            return {
                code: 'xxx',
                message: error.message
            }
        }
    }
}

export default KeyTokenService