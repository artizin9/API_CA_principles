import { IExerciseRepository } from "../../domain/repository/IExerciseRepository";
import { ITrainingRepository } from "../../domain/repository/ITrainingRepository";
import { ServerError } from "../../shared/serverError";

export class DeleteExerciseUseCase{
    constructor(
        private exerciseRepository: IExerciseRepository,
        private trainingRepository: ITrainingRepository
    ){}

    async execute(data: {idTraining: string, idExercise: string }){
        const { idTraining, idExercise } = data
        if (!idTraining && !idExercise) throw new ServerError("Informe ids válidos")

        const trainingExist = await this.trainingRepository.findById(idTraining)
        if (!trainingExist) throw new ServerError("Treino não encontrado", 404)

        const exerciseExist = await this.exerciseRepository.findById(idExercise)
        if (!exerciseExist) throw new ServerError("Exercicio nãop encontrado", 404)
        
        await this.exerciseRepository.delete(exerciseExist)
        return {...exerciseExist}
    }
}


