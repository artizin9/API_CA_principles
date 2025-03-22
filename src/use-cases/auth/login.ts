import { IUserRepository } from "../../domain/repository/IUserRepository"
import bcrypt from "bcrypt"
import { ServerError } from "../../shared/serverError"

export class Login {
    constructor(private userRepository: IUserRepository){}

    async execute(data: {email: string, password: string}){
        const { email, password } = data

        const user = await this.userRepository.findUnique(email)
        const isPassword = await bcrypt.compare(password, user?.password ?? '')

        if (!user || !isPassword) throw new ServerError("Credencias inválidas", 400)

        return {...user}
    }
}