import { CreateUserUseCase } from '../../../use-cases/user/createUser'
import { FastifyRequest, FastifyReply } from 'fastify'
import { UpdateUserUseCase } from '../../../use-cases/user/updateUser'
import { DeleteUseruseCase } from '../../../use-cases/user/deleteUser'
import { ReadUseruseCase } from '../../../use-cases/user/readUser'

export class UserController{
    constructor(
        private CreateUser: CreateUserUseCase, 
        private UpdateUser: UpdateUserUseCase,
        private DeleteUser: DeleteUseruseCase,
        private ReadUser: ReadUseruseCase
    ){}

    async create(req: FastifyRequest, res: FastifyReply){
        const { name, email, password } = req.body as {name: string, email: string, password: string}
        const user = await this.CreateUser.execute({name, email, password})
        res.status(201).send({message: "Usuário criado com sucesso", user})
    }

    async update(req: FastifyRequest, res: FastifyReply){
        const { name, email, password } = req.body as {name: string, email: string, password: string}
        const { id } = req.params as {id: string}
        const userUpdate = await this.UpdateUser.execute({id, name, email, password})
        res.status(200).send({message: "Usuário atualizado com sucesso", userUpdate})
    }

    async delete(req: FastifyRequest, res: FastifyReply){
        const { id } = req.params as {id: string}
        const userDelete = await this.DeleteUser.execute({id})
        const idUser = userDelete.id
        res.status(200).send({message: "Usuário deletado com sucesso", idUser})
    }

    async read(res: FastifyReply){
        const users = await this.ReadUser.execute()
        res.status(200).send({users})
    }
}