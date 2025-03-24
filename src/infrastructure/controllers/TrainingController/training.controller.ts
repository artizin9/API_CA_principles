import { CreateTrainingUseCase } from "../../../use-cases/training/createTraining"
import { UpdateTrainingUseCase } from "../../../use-cases/training/updateTraining"
import { DeleteTrainingUseCase } from "../../../use-cases/training/deleteTraining"
import { ReadTrainingUseCase } from "../../../use-cases/training/readTraining"
import { DataTrainingDTO } from "../../../dto/TrainingDTO"
import { FastifyContextDTO } from "../../../dto/FastifyDTO"

export class TrainingController {
    constructor(
        private createTraining: CreateTrainingUseCase,
        private updateTraining: UpdateTrainingUseCase,
        private deleteTrianing: DeleteTrainingUseCase,
        private readTraining: ReadTrainingUseCase
    ) {}

    async create(fastify: FastifyContextDTO) {
        const trainingData = fastify.req.body as DataTrainingDTO 
        const training = await this.createTraining.execute(trainingData)
        return fastify.res.status(201).send({message: "Treino criado com sucesso", training})
    }

    async update(fastify: FastifyContextDTO) {
        const trainingData = fastify.req.body as DataTrainingDTO
        const { id } = fastify.req.params as {id: string}
        const trainingUpdate = await this.updateTraining.execute({
            dataTrainingDTO: trainingData,
            id
        })
        return fastify.res.status(201).send({message: "Treino atualizado com sucesso", trainingUpdate})
    }

    async delete(fastify: FastifyContextDTO){
        const { id } = fastify.req.params as {id: string}
        await this.deleteTrianing.execute(id)
        return fastify.res.status(201).send({message: "Treino deletado com sucesso!", idTraining: id})
    }

    async read(fastify: FastifyContextDTO){
        const trainings = await this.readTraining.execute()
        fastify.res.status(201).send(trainings)
    }
}