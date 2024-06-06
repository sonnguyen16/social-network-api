import JWT from 'jsonwebtoken'

export const signToken = async (payload, privateKey) => {
    const accessToken = await JWT.sign(payload, privateKey, {
        // algorithm: 'RS256',
        expiresIn: '3d'
    })

    const refreshToken = await JWT.sign(payload, privateKey, {
        // algorithm: 'RS256',
        expiresIn: '30d'
    })

    return { refreshToken, accessToken }
}

export const verifyToken = async (accessToken, privateKey) => {
    // use public key to verify if use RSA
    return await JWT.verify(accessToken, privateKey)
}