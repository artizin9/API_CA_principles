import { FastifyInstance } from "fastify"
import { Register as register } from "./userRoutes"

export const registerRoutes = (fastify: FastifyInstance) => {
    fastify.register(register)
}