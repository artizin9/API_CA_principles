import { TrainingController } from "../../infrastructure/controllers/TrainingController/training.controller"
import { PrismaTrainingRepository } from "../../infrastructure/database/prisma"
import { CreateTrainingUseCase } from "../../use-cases/training/createTraining"

const userReposity = new PrismaTrainingRepository()
const createUserUseCase = new CreateTrainingUseCase(userReposity)
export const trainingController = new TrainingController(
    createUserUseCase
)