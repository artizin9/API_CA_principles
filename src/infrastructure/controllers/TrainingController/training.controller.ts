import { FastifyReply, FastifyRequest } from "fastify"
import { CreateTrainingUseCase, DataTrainingDTO } from "../../../use-cases/training/createTraining"


export class TrainingController {
    constructor(private createTraining: CreateTrainingUseCase) {}

    async create(req: FastifyRequest, res: FastifyReply) {
        const trainingData = req.body as DataTrainingDTO 
        const training = await this.createTraining.execute(trainingData)
        return res.status(201).send({message: "Treino criado com sucesso", training,})
    }
}