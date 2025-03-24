import { ITrainingRepository } from "../../domain/repository/ITrainingRepository";
import { ServerError } from "../../shared/serverError";

export class ReadTrainingUseCase {
    constructor(private trainingRepository: ITrainingRepository){}

    async execute(){
        const trainings = await this.trainingRepository.findMany()
        if (!trainings) throw new ServerError("Não há nenhum treino cadrastrado", 404)
        return {...trainings}
    }
}