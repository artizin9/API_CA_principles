import { prisma } from '../../config/prisma'
import { User } from '../../domain/entities/user'
import { IUserRepository } from '../../domain/repository/IUserRepository'
import { ITrainingRepository } from '../../domain/repository/ITrainingRepository'
import { Training } from '../../domain/entities/training'
import { Exercise } from '../../domain/entities/exercise'
import { IExerciseRepository } from '../../domain/repository/IExerciseRepository'

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
        const training = await prisma.training.findUnique({
            where: { id },
            include: {
                exercises: true,
                users: true,
            }
        })
        return training
    }

    async findMany(): Promise<Training[] | null> {
        const training = await prisma.training.findMany({
            include: {
                exercises: true,
                users: true
            }
        })
        return training.length > 0
        ? training.map((train) => new Training(
            train.nameTraining,
            train.levelTraining,
            train.timeTraining,
            train.destinedTraining,
            train.exercises,
            train.users, 
            train.id
        ))
        : null;
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
                    connect: training.user?.map(exercises => ({id: exercises.id})) || []
                },
                exercises: {
                    connect: training.exercises?.map(exercises => ({id: exercises.id})) || []
                }
            }
        })
    }
    
    async update(training: Training): Promise<Training> {
        await prisma.training.update({
            where: { id: training.id },
            data: {
                nameTraining: training.nameTraining,
                levelTraining: training.levelTraining,
                timeTraining: training.timeTraining,
                destinedTraining: training.destinedTraining,
                exercises: {
                    connect: training.exercises?.map(exercise => ({ id: exercise.id }))
                }
            },
            include: { exercises: true }
        })

        return training
    }
    
    async delete(training: Training): Promise<void> {
        await prisma.training.delete({
            where: { id: training.id }
        })
    }
}

export class PrismaExerciseRepository implements IExerciseRepository{
    async findUnique(id: string): Promise<Exercise | null> {
        const exercise = await prisma.exercise.findUnique({
            where: { id }
        })
        return exercise
    }

    async findById(id: string): Promise<Exercise | null> {
        const exercise = await prisma.exercise.findFirst({
            where: { id }
        })
        return exercise
    }

    async findMany(): Promise<Exercise[] | null> {
        const exercise = await prisma.exercise.findMany()
        return exercise.length > 0 ? exercise.map((exercises: { nameExercise: string, numberRep: number, numberExec: number, execByRep: string, interval: string, id: string }) => new Exercise(exercises.nameExercise, exercises.numberRep, exercises.numberExec, exercises.execByRep, exercises.interval, exercises.id)) : null
    }

    async create(exercise: Exercise): Promise<void> {
        await prisma.exercise.create({
            data: {
                id: exercise.id ?? '',
                nameExercise: exercise.nameExercise,
                numberRep: exercise.numberRep,
                numberExec: exercise.numberExec,
                execByRep: exercise.execByRep,
                interval: exercise.interval,
                training: {
                    connect: { id: exercise.trainingId } 
                }
            }
        })
    }
    
    async update(exercise: Exercise): Promise<void>{
        await prisma.exercise.update({
            where: { id: exercise.id },
            data: {
                nameExercise: exercise.nameExercise,
                numberRep: exercise.numberRep,
                numberExec: exercise.numberExec,
                execByRep: exercise.execByRep,
                interval: exercise.interval,
            }
        })
    }

    async delete(exercise: Exercise): Promise<void>{
        await prisma.exercise.delete({
            where: { id: exercise.id }
        })
    }
}