import { randomUUID } from "crypto"
import { trainingSchema } from "../../infrastructure/schemas/trainingSchema"
import { ITrainingRepository } from "../../domain/repository/ITrainingRepository"
import { Training } from "../../domain/entities/training"
import { ServerError } from "../../shared/serverError"

export interface DataTrainingDTO {
    nameTraining: string, 
    levelTraining: string, 
    timeTraining: string, 
    destinedTraining: string
}

export class CreateTrainingUseCase {
    constructor( private trainingRepository: ITrainingRepository ){}

    async execute(data: DataTrainingDTO){
        const parseData = trainingSchema.safeParse(data)
        if (!parseData.success) throw new ServerError('Informações inválidas')
        
        const {nameTraining, levelTraining, timeTraining, destinedTraining} = data
        const id = randomUUID()
        const training = new Training(nameTraining, levelTraining, timeTraining, destinedTraining, [], [], id)

        await this.trainingRepository.create(training)
        return {...training}
    }
}
