import JWT from 'jsonwebtoken'

export const signToken = async (payload, publicKey, privateKey) => {
    const accessToken = await JWT.sign(payload, privateKey, {
        algorithm: 'RS256',
        expiresIn: '2d'
    })

    const refreshToken = await JWT.sign(payload, privateKey, {
        algorithm: 'RS256',
        expiresIn: '7d'
    })

    JWT.verify(accessToken, publicKey, (err, decode) => {
        if (err) {
            console.log('error verify::', err)
        } else {
            console.log('decode verify::', decode);
        }
    })

    return { refreshToken, accessToken }
}