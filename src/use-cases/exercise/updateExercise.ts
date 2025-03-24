import { IExerciseRepository } from "../../domain/repository/IExerciseRepository";
import { ITrainingRepository } from "../../domain/repository/ITrainingRepository";
import { DataExerciseDTO } from "../../dto/ExerciseDTO";
import { exerciseSchema } from "../../infrastructure/schemas/exerciseSchema";
import { ServerError } from "../../shared/serverError";

export class UpdateExerciseUseCase{
    constructor(
        private exerciseRepository: IExerciseRepository,
        private trainingRepository: ITrainingRepository
    ){}

    async execute(data: {dataExercise: DataExerciseDTO, idTraining: string, idExercise: string}){
        if (!data.idTraining && !data.idExercise) throw new ServerError("Id inválido")
        
        const parsedData = exerciseSchema.partial().safeParse(data.dataExercise)
        if (!parsedData.success) throw new ServerError("Informações inválidas", 404)

        const trainingExist = await this.trainingRepository.findById(data.idTraining)
        if (!trainingExist) throw new ServerError("Treino não existe", 404)
        
        const exerciseExist = await this.exerciseRepository.findById(data.idExercise)
        if (!exerciseExist) throw new ServerError("Exercicio não existe", 404)

        Object.assign({...trainingExist}, parsedData.data)
        const updatedExercise = {...exerciseExist, ...parsedData.data}
        
        await this.exerciseRepository.update(updatedExercise)
        return updatedExercise
    }
}