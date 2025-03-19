import Fastify from 'fastify'

const server = Fastify()

server.listen({port: 3333}, (err, address) => {
    if (err) {
        console.error("Error starting server:", err)
        process.exit(1)
    }
    console.log("Server http running!", address)
})