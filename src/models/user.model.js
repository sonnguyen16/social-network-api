import { model, Schema } from "mongoose"

const DOCUMENT_NAME = 'User'
const COLLECTION_NAME = 'Users'

// Declare the Schema of the Mongo model
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
    },
    date_of_birth: {
        type: Schema.Types.Date,
    },
    avatar: {
        type: String,
    },
    verify: {
        type: Schema.Types.Boolean,
        default: false
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});

export default model(DOCUMENT_NAME, userSchema)