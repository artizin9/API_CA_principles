import { UserController } from "../controllers/UserController/userController"
import { CreateUserUseCase } from "../../use-cases/user/createUser"
import { PrismaUserRepository } from "../database/prisma"
import { authGuard } from "../middlewares/guard"
import { FastifyInstance } from "fastify"

export async function Register(fastify: FastifyInstance){
    const userReposity = new PrismaUserRepository()
    const createUserUseCase = new CreateUserUseCase(userReposity)
    const userControlller = new UserController(createUserUseCase)

    fastify.post('/register', (req, res) => userControlller.create(req, res))
}