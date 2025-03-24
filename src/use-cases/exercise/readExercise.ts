import { ITrainingRepository } from "../../domain/repository/ITrainingRepository";
import { ServerError } from "../../shared/serverError";

export class ReadExerciseUseCase {
    constructor (
        private trainingRepository: ITrainingRepository
    ){}

    async execute(idTraining: string){
        if (!idTraining) throw new ServerError("Id invalído")
        const trainingExist = await this.trainingRepository.findById(idTraining)

        if (!trainingExist) throw new ServerError("Treino não encontrado", 404)
        const { exercises } = trainingExist

        if (!exercises) throw new ServerError("Não há exercicios cadastrados", 404)
        return {...exercises}
    }
}