import keytokenModel from "../models/keytoken.model.js"

class KeyTokenService {
    static async createKeyToken({ _id, publicKey, privateKey }) {
        const publicKeyString = publicKey.toString()
        const privateKeyString = privateKey.toString()
        const keyToken = await keytokenModel.create({
            user: _id, publicKey: publicKeyString, privateKey: privateKeyString
        })

        return {
            publicKeyString: keyToken.publicKey,
            privateKeyString: keyToken.privateKey
        }
    }
}

export default KeyTokenService