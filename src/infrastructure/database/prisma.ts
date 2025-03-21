import { prisma } from '../../config/prisma'
import { User } from '../../domain/entities/user'
import { IUserRepository } from '../../domain/repository/IUserRepository'

export class PrismaUserRepository implements IUserRepository{
    async findUnique(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { email }
        })
        return user
    }

    async findByIdOrEmail(id: string, email: string): Promise<User | null> {
        const user = await prisma.user.findFirst({
            where: {
                OR: [{ id }, { email }]
            }
        })
        return user
    }

    async findMany(): Promise<User[] | null> {
        const users = await prisma.user.findMany()
        return users.length > 0 ? users.map(user => new User(user.name, user.email, user.password, user.id)) : null
    }

    async create(user: User): Promise<void> {
        await prisma.user.create({
            data: {
                id: user.id ?? '',
                email: user.email,
                name: user.name,
                password: user.password
            }
        })
    }
    
    async update(user: User): Promise<void> {
        await prisma.user.update({
            where: { id: user.id },
            data: {
                email: user.email,
                name: user.name,
                password: user.password
            }
        })
    }

    async delete(user: User): Promise<void> {
        await prisma.user.delete({
            where: {id: user.id}
        })
    }
}