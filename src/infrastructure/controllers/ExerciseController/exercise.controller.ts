import { DataExerciseDTO } from "../../../dto/ExerciseDTO"
import { FastifyContextDTO } from "../../../dto/FastifyDTO"
import { CreateExerciseUseCase } from "../../../use-cases/exercise/createExercise"
import { UpdateExerciseUseCase } from "../../../use-cases/exercise/updateExercise"
import { DeleteExerciseUseCase } from "../../../use-cases/exercise/deleteExercise"
import { ReadExerciseUseCase } from "../../../use-cases/exercise/readExercise"

export class ExerciseController {
    constructor(
        private createExercise: CreateExerciseUseCase,
        private updateExercise: UpdateExerciseUseCase,
        private deleteExercise: DeleteExerciseUseCase,
        private readExercise: ReadExerciseUseCase
    ){}

    async create(fastify: FastifyContextDTO){
        const dataExercise = fastify.req.body as DataExerciseDTO
        const { idTraining } = fastify.req.params as {idTraining: string}
        const exercise = await this.createExercise.execute({dataExercise, idTraining})
        fastify.res.status(201).send({message: "Exercicio criado com sucesso", exercise})
    }

    async update(fastify: FastifyContextDTO){
        const dataExercise = fastify.req.body as DataExerciseDTO
        const { idTraining, idExercise } = fastify.req.params as { idTraining: string, idExercise: string}
        const exercise = await this.updateExercise.execute({dataExercise, idTraining, idExercise})
        fastify.res.status(201).send({message: "Exercicio atualizado com sucesso", exercise})
    }

    async delete(fastify: FastifyContextDTO){
        const { idTraining, idExercise } = fastify.req.params as { idTraining: string, idExercise: string}
        const exercise = await this.deleteExercise.execute({idTraining, idExercise})
        fastify.res.status(201).send({message: "Exercicio deletado com sucesso", id: exercise.id})
    }

    async read(fastify: FastifyContextDTO){
        const { idTraining } = fastify.req.params as { idTraining: string }
        const exercises = await this.readExercise.execute(idTraining)
        fastify.res.status(201).send({idTraining: idTraining, exercises})
    }
}