import { FastifyInstance } from "fastify";
import { exerciseInstance } from "../../shared/instances/exercise.instance";
import { authGuard } from "../middlewares/guard";

export function createExercise(fastify: FastifyInstance){
    fastify.post('/exercises/:idTraining', authGuard, (req, res) => exerciseInstance.create({req, res}))
}