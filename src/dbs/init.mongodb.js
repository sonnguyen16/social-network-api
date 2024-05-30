import mongoose from "mongoose"
import configMongodb from "../configs/config.mongodb.js"

const { host, port, name } = configMongodb.db

const DB_URL = `mongodb://${host}:${port}/${name}`

class Database {
    constructor() {
        this.connect()
    }

    connect(type = 'mongodb') {
        mongoose.connect(DB_URL, { maxPoolSize: 50 })
            .then(() => console.log('Connect MongoDB Success!'))
            .catch(() => console.log('Connect MongoDB fail!'))
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance
    }
}

export const mongodbInstance = Database.getInstance()