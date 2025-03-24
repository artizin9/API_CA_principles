import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { trainingController } from "../../shared/instances/training.instance"
import { authGuard } from "../middlewares/guard"


export function createTraining(fastify: FastifyInstance){
    fastify.post('/trainings/register', authGuard, (req, res) => trainingController.create({req, res}))
}

export function updateTraining(fastify: FastifyInstance){
    fastify.put('/trainings/:id', authGuard, (req, res) => trainingController.update({req, res}))
}

export function deleteTraining(fastify: FastifyInstance){
    fastify.delete('/trainings/:id', authGuard, (req, res) => trainingController.delete({req, res}))
}

export function readTraining(fastify: FastifyInstance){
    fastify.get('/trainings', authGuard, (req, res) => trainingController.read({req, res}))
}