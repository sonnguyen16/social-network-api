import userModel from "../models/user.model.js"
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import KeyTokenService from "./keytoken.service.js"
import { signToken } from "../utils/auth.js"
import { getDataByField } from "../utils/lodash.js"
import { AuthFailureError, BadRequestError } from "../core/error.response.js"

class AuthService {
    static async signUp({ name, email, password }) {
        const existUser = await userModel.findOne({ email }).lean()
        if (existUser) throw new BadRequestError('Error: User already registered!')

        const hashPassword = await bcrypt.hashSync(password, 10)
        const newUser = await userModel.create({
            name, email, password: hashPassword
        })

        if (newUser) {
            const { accessToken, refreshToken } = await this.createAccessAndRefreshToken(newUser)

            return {
                user: getDataByField(newUser, ['name', 'email']),
                accessToken,
                refreshToken
            }
        }
    }

    static async login({ email, password, refreshTokenExist = null }) {
        const foundUser = await userModel.findOne({ email }).lean()
        if (!foundUser) throw new AuthFailureError('User not found')

        const match = await bcrypt.compare(password, foundUser.password)
        if (!match) throw new AuthFailureError('Password not correct')

        const { accessToken, refreshToken } = await this.createAccessAndRefreshToken(foundUser)

        return {
            user: getDataByField(foundUser, ['_id', 'name', 'email']),
            accessToken,
            refreshToken
        }
    }

    static async createAccessAndRefreshToken(user) {
        /* RSA algorithm
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

         const publicKeyObject = crypto.createPublicKey(publicKey)
         const privateKeyObject = crypto.createPrivateKey(privateKey)
        */

        const privateKey = crypto.randomBytes(64).toString('hex')
        const { accessToken, refreshToken } = await signToken({ user_id: user._id }, privateKey)

        KeyTokenService.createKeyToken({
            _id: user._id, privateKey, refreshToken
        })

        return { accessToken, refreshToken }
    }

    static async logout(keyStore) {
        return await KeyTokenService.deleteById(keyStore)
    }
}

export default AuthService