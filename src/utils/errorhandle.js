import StatusCodes from '../constants/statusCodes.js'

export const routeErrorHandle = (req, res, next) => {
    const error = new Error('Not found')
    error.status = StatusCodes.NOT_FOUND
    next(error)
}

export const errorHandle = (err, req, res, next) => {
    const statusCode = err.statusCode || 500
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: err.message || 'Internal Server Error'
    })
}

export const asyncHandler = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next)
    }
}