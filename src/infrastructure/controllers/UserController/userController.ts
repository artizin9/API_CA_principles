import { CreateUserUseCase } from '../../../use-cases/user/createUser'
import { FastifyRequest, FastifyReply } from 'fastify'

export class UserController{
    constructor(private CreateUser: CreateUserUseCase){}

    async create(req: FastifyRequest, res: FastifyReply){
        const { name, email, password } = req.body as {name: string, email: string, password: string}
        const user = await this.CreateUser.execute({name, email, password})
        res.status(201).send({message: "Usuário criado com sucesso", user})
    }
}