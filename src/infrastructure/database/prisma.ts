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
}