import { FastifyInstance } from "fastify";
import { trainingController } from "../../shared/instances/training.instance";
import { authGuard } from "../middlewares/guard";

export function createTraining(fastify: FastifyInstance){
    fastify.post('/trainings', authGuard, (req, res) => trainingController.create(req, res))
}