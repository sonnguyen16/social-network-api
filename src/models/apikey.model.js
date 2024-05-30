import { model, Schema } from "mongoose"

const DOCUMENT_NAME = 'Apikey'
const COLLECTION_NAME = 'Apikeys'

// Declare the Schema of the Mongo model
const apiKeySchema = new Schema({
    key: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});

export default model(DOCUMENT_NAME, apiKeySchema)