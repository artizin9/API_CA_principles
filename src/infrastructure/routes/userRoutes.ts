import { authGuard } from "../middlewares/guard"
import { FastifyInstance } from "fastify"
import { userInstance } from "../../shared/instances/user.instance"

export async function createUser(fastify: FastifyInstance){
    fastify.post('/register', (req, res) => userInstance.create({req, res}))
}

export async function updateUser(fastify: FastifyInstance){
    fastify.put('/users/:id', authGuard, (req, res) => userInstance.update({req, res}))
}

export async function deleteUser(fastify: FastifyInstance){
    fastify.delete('/users/:id', authGuard, (req, res) => userInstance.delete({req, res}))
}

export async function readUser(fastify: FastifyInstance){
    fastify.get('/users', authGuard, (req, res) => userInstance.read({req, res}))
}