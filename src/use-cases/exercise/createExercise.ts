import { randomUUID } from "crypto";
import { IExerciseRepository } from "../../domain/repository/IExerciseRepository";
import { ITrainingRepository } from "../../domain/repository/ITrainingRepository";
import { Exercise as typeExercise, exerciseSchema } from "../../infrastructure/schemas/exerciseSchema";
import { ServerError } from "../../shared/serverError";
import { Exercise } from "../../domain/entities/exercise";

export class CreateExerciseUseCase {
    constructor(
        private exerciseRepository: IExerciseRepository,
        private trainingRepository: ITrainingRepository
    ){}

    async execute(data: {dataExercise: typeExercise, idTraining: string}){
        const parsedData = exerciseSchema.safeParse(data.dataExercise)
        if (!parsedData.success) throw new ServerError("Informações incorretas")
        
        const { nameExercise, numberExec, numberRep, interval, execByRep } = parsedData.data
        const { idTraining } = data
        const id = randomUUID()

        const trainingExist = await this.trainingRepository.findById(idTraining)
        if (!trainingExist) throw new ServerError("O treino não existe", 404)
        
        const exercise = new Exercise(nameExercise, numberRep, numberExec, execByRep, interval, idTraining, id)
        await this.exerciseRepository.create(exercise)

        trainingExist.exercises = trainingExist.exercises ? [...trainingExist.exercises, exercise] : [exercise]
        await this.trainingRepository.update(trainingExist)

        return {...exercise}
    }
}