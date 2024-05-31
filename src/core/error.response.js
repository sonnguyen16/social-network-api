import StatusCodes from "../constants/statusCodes.js"
import ReasonPhrases from "../constants/reasonPhrases.js"

class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

export class ConflictRequestError extends ErrorResponse {
    constructor(message = ReasonPhrases.CONFLICT, statusCode = StatusCodes.CONFLICT) {
        super(message, statusCode)
    }
}

export class BadRequestError extends ErrorResponse {
    constructor(message = ReasonPhrases.BAD_REQUEST, statusCode = StatusCodes.BAD_REQUEST) {
        super(message, statusCode)
    }
}

export class ForbidenError extends ErrorResponse {
    constructor(message = ReasonPhrases.FORBIDDEN, statusCode = StatusCodes.FORBIDDEN) {
        super(message, statusCode)
    }
}