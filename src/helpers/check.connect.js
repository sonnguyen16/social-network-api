import os from 'os'
import process from 'process'
import mongoose from 'mongoose'

const _SECOND = 5000

export function checkOverload() {
    setInterval(() => {
        const numConnections = mongoose.connections.length
        const numCores = os.cpus().length
        const memoryUsage = process.memoryUsage().rss

        const maxConnections = numCores * 5
        const activeConnections = mongoose.connections.length

        console.log(`Active connections: ${activeConnections}`)
        console.log(`Memory Usage: ${memoryUsage / 1024 / 1024} MB`)

        if (numConnections > maxConnections) {
            console.log('Server is overloading!')
        }
    }, _SECOND)
}