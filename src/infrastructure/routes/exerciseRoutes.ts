import { FastifyInstance } from "fastify";
import { exerciseInstance } from "../../shared/instances/exercise.instance";
import { authGuard } from "../middlewares/guard";

export function createExercise(fastify: FastifyInstance){
    fastify.post('/exercises/:idTraining', authGuard, (req, res) => exerciseInstance.create({req, res}))
}

export function updateExercise(fastify: FastifyInstance){
    fastify.put('/exercises/:idTraining/:idExercise', authGuard, (req, res) => exerciseInstance.update({req, res}))
}

export function deleteExercise(fastify: FastifyInstance){
    fastify.delete('/exercises/:idTraining/:idExercise', authGuard, (req, res) => exerciseInstance.delete({req, res}))
}

export function readExercise(fastify: FastifyInstance){
    fastify.get('/exercises/:idTraining', authGuard, (req, res) => exerciseInstance.read({req, res}))
}
