import { ITrainingRepository } from "../../domain/repository/ITrainingRepository"
import { DataTrainingDTO } from "../../dto/TrainingDTO"
import { trainingSchema } from "../../infrastructure/schemas/trainingSchema"
import { ServerError } from "../../shared/serverError"

export class UpdateTrainingUseCase{
    constructor( private trainingRepository: ITrainingRepository ){}

    async execute(data: {dataTrainingDTO: DataTrainingDTO, id: string }){
        if (!data.id) throw new ServerError("Id inválido")

        const parsedData = trainingSchema.partial().safeParse(data.dataTrainingDTO)
        if (!parsedData) throw new ServerError("Informações inválidas")

        const existingTraining = await this.trainingRepository.findById(data.id)
        if (!existingTraining) throw new ServerError("Treino não existe", 404)
        
        const updatedTraining = { ...existingTraining }
        Object.assign(updatedTraining, data.dataTrainingDTO)
        await this.trainingRepository.update(updatedTraining)

        return {...updatedTraining}
    }
}