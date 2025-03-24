import { CreateUserUseCase } from '../../../use-cases/user/createUser'
import { FastifyRequest, FastifyReply } from 'fastify'
import { UpdateUserUseCase } from '../../../use-cases/user/updateUser'
import { DeleteUseruseCase } from '../../../use-cases/user/deleteUser'
import { ReadUseruseCase } from '../../../use-cases/user/readUser'
import { FastifyContextDTO } from '../../../dto/FastifyDTO'

export class UserController{
    constructor(
        private CreateUser: CreateUserUseCase, 
        private UpdateUser: UpdateUserUseCase,
        private DeleteUser: DeleteUseruseCase,
        private ReadUser: ReadUseruseCase
    ){}

    async create(fastify: FastifyContextDTO){
        const { name, email, password } = fastify.req.body as {name: string, email: string, password: string}
        const user = await this.CreateUser.execute({name, email, password})
        fastify.res.status(201).send({message: "Usuário criado com sucesso", user})
    }

    async update(fastify: FastifyContextDTO){
        const { name, email, password } = fastify.req.body as {name: string, email: string, password: string}
        const { id } = fastify.req.params as {id: string}
        const userUpdate = await this.UpdateUser.execute({id, name, email, password})
        fastify.res.status(200).send({message: "Usuário atualizado com sucesso", userUpdate})
    }

    async delete(fastify: FastifyContextDTO){
        const { id } = fastify.req.params as {id: string}
        const userDelete = await this.DeleteUser.execute({id})
        const idUser = userDelete.id
        fastify.res.status(200).send({message: "Usuário deletado com sucesso", idUser})
    }

    async read(fastify: FastifyContextDTO){
        const users = await this.ReadUser.execute()
        fastify.res.status(200).send({users})
    }
}