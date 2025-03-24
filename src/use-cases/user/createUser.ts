import { User } from "../../domain/entities/user"
import { IUserRepository } from "../../domain/repository/IUserRepository"
import { ServerError } from "../../shared/serverError"
import { userSchema } from "../../infrastructure/schemas/userSchema"
import { randomUUID } from "crypto"
import jwt from 'jsonwebtoken'
import { env } from '../../config/env'
import bcrypt from "bcrypt"

export class CreateUserUseCase {
    constructor(private userReposity: IUserRepository){}

    async execute(data: {name: string, email: string, password: string}){
        const parsedData = userSchema.safeParse(data)
        if (!parsedData.success) throw new ServerError("Credencias inválidas")

        const { name, email, password } = parsedData.data!
        const id = randomUUID()
        const hashedPassword: string = await bcrypt.hash(password, 10)
        const token = jwt.sign({id: id}, env.JWT_SECRET, {expiresIn: '1h'})

        const isEmailExist = await this.userReposity.findUnique(email)
        if (isEmailExist) throw new ServerError("Email em uso", 409)
        
        const user = new User(name, email, hashedPassword, [], id)
        await this.userReposity.create(user)

        return { ...user, token }
    }
}