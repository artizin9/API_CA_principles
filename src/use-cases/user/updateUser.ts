import { IUserRepository } from "../../domain/repository/IUserRepository"
import { ServerError } from "../../shared/serverError"
import { userSchema } from "../../infrastructure/schemas/userSchema"
import bcrypt from "bcrypt"

export class UpdateUserUseCase {
    constructor(private userReposity: IUserRepository){}

    async execute(data: {id: string, name?: string, email?: string, password?: string}){
        if (!data.id) throw new ServerError("Id é obrigátorio")
        const parsedData = userSchema.partial().safeParse(data)
        if (!parsedData.success) throw new ServerError("Credencias inválidas")

        const { name, email, password } = parsedData.data!

        const existingUser = await this.userReposity.findByIdOrEmail(data.id, email || "")
        if (!existingUser) throw new ServerError("Usuário não encontrado", 404)
            
        if (name) existingUser.name = name
        if (email) existingUser.email = email
        if (password) existingUser.password = await bcrypt.hash(password, 10)

        await this.userReposity.update(existingUser)
        return {...existingUser}
    }
}