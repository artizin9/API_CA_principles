import { DataExerciseDTO } from "../../../dto/ExerciseDTO";
import { FastifyContextDTO } from "../../../dto/FastifyDTO";
import { CreateExerciseUseCase } from "../../../use-cases/exercise/createExercise";

export class ExerciseController {
    constructor(
        private createExercise: CreateExerciseUseCase
    ){}

    async create(fastify: FastifyContextDTO){
        const dataExercise = fastify.req.body as DataExerciseDTO
        const { idTraining } = fastify.req.params as {idTraining: string}
        const exercise = await this.createExercise.execute({dataExercise, idTraining})
        fastify.res.status(201).send({message: "Exercicio criado com sucesso", exercise})
    }
}