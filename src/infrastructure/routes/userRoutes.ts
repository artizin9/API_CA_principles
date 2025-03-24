import { authGuard } from "../middlewares/guard"
import { FastifyInstance } from "fastify"
import { userController } from "../../shared/instances/user.instance"

export async function createUser(fastify: FastifyInstance){
    fastify.post('/register', (req, res) => userController.create({req, res}))
}

export async function updateUser(fastify: FastifyInstance){
    fastify.put('/users/:id', authGuard, (req, res) => userController.update({req, res}))
}

export async function deleteUser(fastify: FastifyInstance){
    fastify.delete('/users/:id', authGuard, (req, res) => userController.delete({req, res}))
}

export async function readUser(fastify: FastifyInstance){
    fastify.get('/users', authGuard, (req, res) => userController.read({req, res}))
}