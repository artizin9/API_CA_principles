import { FastifyInstance } from "fastify"
import { createUser as register, updateUser, deleteUser, readUser } from "./userRoutes"
import { authRoutes } from "./authRoutes"

const routes = [ register, updateUser, deleteUser, readUser, authRoutes]
export const registerRoutes = (fastify: FastifyInstance) => routes.forEach(
    (route) => fastify.register(route)
)