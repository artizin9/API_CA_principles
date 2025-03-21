import { IUserRepository } from "../../domain/repository/IUserRepository"
import { ServerError } from "../../shared/serverError"

export class DeleteUseruseCase {
    constructor(private userRepository: IUserRepository){}

    async execute(data: {id: string, email?: string}){
        if (!data.id) throw new ServerError("Id é obrigátorio")
        const {id, email} = data

        const existingUser = await this.userRepository.findByIdOrEmail(id, email || '')
        if (!existingUser) throw new ServerError("Usuário não encontrado", 404)

        await this.userRepository.delete(existingUser)
        return {...existingUser}
    }
}