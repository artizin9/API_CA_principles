import { FastifyInstance } from "fastify"
import { createUser as register, updateUser, deleteUser, readUser } from "./userRoutes"

const routes = [ register, updateUser, deleteUser, readUser]
export const registerRoutes = (fastify: FastifyInstance) => routes.forEach(
    (route) => fastify.register(route)
)