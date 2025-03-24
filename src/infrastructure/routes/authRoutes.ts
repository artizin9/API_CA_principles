import { authGuard } from "../middlewares/guard"
import { FastifyInstance } from "fastify"
import { authController } from "../../shared/instances/auth.instance"

export function authRoutes(fastify: FastifyInstance){
    fastify.post('/login', authGuard, (req, res) => authController.authUser(req, res))
}