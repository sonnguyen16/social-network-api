import StatusCodes from "../constants/statusCodes.js";
import ReasonPhrases from "../constants/reasonPhrases.js";

export class SuccessResponse {
    constructor({ message, statusCode = StatusCodes.OK, reasonPhrase = ReasonPhrases.OK, metadata = {} }) {
        this.message = message ? message : reasonPhrase
        this.metadata = metadata
        this.statusCode = statusCode
    }

    send(res, header = {}) {
        res.status(this.statusCode).json(this)
    }
}

export class OK extends SuccessResponse {
    constructor({ message, metadata = {} }) {
        super(message, metadata)
    }
}

export class CREATED extends SuccessResponse {
    constructor({ message, statusCode = StatusCodes.CREATED, reasonPhrase = ReasonPhrases.CREATED, metadata }) {
        super({ message, statusCode, reasonPhrase, metadata })
    }
}