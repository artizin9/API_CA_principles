import Fastify from 'fastify'
import { registerRoutes } from './infrastructure/routes/registerRoutes'

const server = Fastify()
server.register(registerRoutes)

server.listen({port: 3333}, (err, address) => {
    if (err) {
        console.error("Error starting server:", err)
        process.exit(1)
    }
    console.log("Server http running!", address)
})