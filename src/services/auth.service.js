import userModel from "../models/user.model.js"
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import KeyTokenService from "./keytoken.service.js"
import { signToken } from "../utils/auth.js"
import { getDataByField } from "../utils/lodash.js"
import { BadRequestError } from "../core/error.response.js"


class AuthService {
    static async signUp({ name, email, password }) {
        const existUser = await userModel.findOne({ email }).lean()

        if (existUser) throw new BadRequestError('Error: User already registered!')

        const hashPassword = await bcrypt.hashSync(password, 10)

        const newUser = await userModel.create({
            name, email, password: hashPassword
        })

        if (newUser) {
            const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
                modulusLength: 4096,
                publicKeyEncoding: {
                    type: 'pkcs1',
                    format: 'pem'
                },
                privateKeyEncoding: {
                    type: 'pkcs1',
                    format: 'pem'
                },
            })

            // const publicKey = crypto.randomBytes(64).toString('hex')
            // const privateKey = crypto.randomBytes(64).toString('hex')

            const { publicKeyString, privateKeyString } = await KeyTokenService.createKeyToken({
                _id: newUser._id, publicKey, privateKey
            })

            const publicKeyObject = crypto.createPublicKey(publicKeyString)
            const privateKeyObject = crypto.createPrivateKey(privateKeyString)

            const { accessToken, refreshToken } = await signToken({ user_id: newUser._id }, publicKeyObject, privateKeyObject)

            return {
                user: getDataByField(newUser, ['name', 'email']),
                accessToken,
                refreshToken
            }
        }
    }
}

export default AuthService