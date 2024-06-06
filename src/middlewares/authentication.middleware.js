import { AuthFailureError, NotFoundError } from "../core/error.response.js"
import KeyTokenService from "../services/keytoken.service.js"
import { verifyToken } from "../utils/auth.js"

const HEADER = {
    CLIENT_ID: 'x-user-id',
    AUTHORIZATION: 'authorization'
}

export const authentication = async (req, res, next) => {
    const user_id = req.headers[HEADER.CLIENT_ID]
    if (!user_id) throw new AuthFailureError('Invalid request')

    const keyStore = await KeyTokenService.findByUserId(user_id)
    if (!keyStore) throw new NotFoundError('Not found key store')

    const accessToken = req.headers[HEADER.AUTHORIZATION].split(' ')[1]
    if (!accessToken) throw new AuthFailureError('Invalid Request')

    const decode = await verifyToken(accessToken, keyStore.privateKey)
    if (decode.user_id !== user_id) throw new AuthFailureError('Invalid user id')
    req.keyStore = keyStore
    return next()
}