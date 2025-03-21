import { IUserRepository } from "../../domain/repository/IUserRepository";
import { ServerError } from "../../shared/serverError";

export class ReadUseruseCase {
    constructor(private userRepository: IUserRepository){}

    async execute(){
        const users = await this.userRepository.findMany()
        if (!users) throw new ServerError("Não há usuários cadastrados", 404)
        return {...users}
    }
}