import { ITrainingRepository } from "../../domain/repository/ITrainingRepository";
import { ServerError } from "../../shared/serverError";

export class DeleteTrainingUseCase {
    constructor( private trainingRepository: ITrainingRepository){}

    async execute(id: string){
        if (!id) throw new ServerError("Id inválido")
        
        const trainingDelete = await this.trainingRepository.findById(id)
        if (!trainingDelete) throw new ServerError("O treino não existe", 409)
        
        await this.trainingRepository.delete(trainingDelete)
        return {...trainingDelete}
    }
}