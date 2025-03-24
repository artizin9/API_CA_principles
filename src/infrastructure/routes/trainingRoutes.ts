import { FastifyInstance } from "fastify"
import { trainingInstance } from "../../shared/instances/training.instance"
import { authGuard } from "../middlewares/guard"


export function createTraining(fastify: FastifyInstance){
    fastify.post('/trainings/register', authGuard, (req, res) => trainingInstance.create({req, res}))
}

export function updateTraining(fastify: FastifyInstance){
    fastify.put('/trainings/:id', authGuard, (req, res) => trainingInstance.update({req, res}))
}

export function deleteTraining(fastify: FastifyInstance){
    fastify.delete('/trainings/:id', authGuard, (req, res) => trainingInstance.delete({req, res}))
}

export function readTraining(fastify: FastifyInstance){
    fastify.get('/trainings', authGuard, (req, res) => trainingInstance.read({req, res}))
}