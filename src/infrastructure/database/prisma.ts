import { prisma } from '../../config/prisma'
import { User } from '../../domain/entities/user'
import { IUserRepository } from '../../domain/repository/IUserRepository'
import { ITrainingRepository } from '../../domain/repository/ITrainingRepository'
import { Training } from '../../domain/entities/training'

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
        return users.length > 0 ? users.map((user: { name: string, email: string, password: string, id: string }) => new User(user.name, user.email, user.password, [], user.id)) : null
    }

    async create(user: User): Promise<void> {
        await prisma.user.create({
            data: {
                id: user.id ?? '',
                email: user.email,
                name: user.name,
                password: user.password,
                trainings: {
                    connect: user.training?.map(training => ({ id: training.id })) || []
                }
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


export class PrismaTrainingRepository implements ITrainingRepository{
    async findUnique(id: string): Promise<Training | null> {
        const training = await prisma.training.findUnique({
            where: { id }
        })
        return training
    }

    async findById(id: string): Promise<Training | null> {
        const training = await prisma.training.findFirst({
            where: { id }
        })
        return training
    }

    async findMany(): Promise<Training[] | null> {
        const trainings = await prisma.training.findMany()
        return trainings.length > 0 ? trainings.map((trainings: { nameTraining: string, levelTraining: string, timeTraining: string, destinedTraining: string, id: string }) => new Training(trainings.nameTraining, trainings.levelTraining, trainings.timeTraining, trainings.destinedTraining, [], [], trainings.id)) : null
    }

    async create(training: Training): Promise<void> {
        await prisma.training.create({
            data: {
                id: training.id ?? '',
                nameTraining: training.nameTraining,
                levelTraining: training.levelTraining,
                timeTraining: training.timeTraining,
                destinedTraining: training.destinedTraining,
                users: {
                    connect: training.user?.map(trainings => ({id: trainings.id})) || []
                },
                exercises: {
                    connect: training.exercises?.map(trainings => ({id: trainings.id})) || []
                }
            }
        })
    }
    
    async update(training: Training): Promise<void> {
        await prisma.training.update({
            where: { id: training.id },
            data: {
                nameTraining: training.nameTraining,
                levelTraining: training.levelTraining,
                timeTraining: training.timeTraining,
                destinedTraining: training.destinedTraining
            }
        })
    }

    async delete(training: Training): Promise<void> {
        await prisma.training.delete({
            where: { id: training.id }
        })
    }
}