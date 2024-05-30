import app from "../learn-nodejs/src/app.js"
import configMongodb from "./src/configs/config.mongodb.js"

const { port } = configMongodb.app

const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
