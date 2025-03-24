import { TrainingController } from "../../infrastructure/controllers/TrainingController/training.controller"
import { PrismaTrainingRepository } from "../../infrastructure/database/prisma"
import { CreateTrainingUseCase } from "../../use-cases/training/createTraining"
import { UpdateTrainingUseCase } from "../../use-cases/training/updateTraining"
import { DeleteTrainingUseCase } from "../../use-cases/training/deleteTraining"
import { ReadTrainingUseCase } from "../../use-cases/training/readTraining"

const userReposity = new PrismaTrainingRepository()
const createTrainingUseCase = new CreateTrainingUseCase(userReposity)
const updateTrainingUseCase = new UpdateTrainingUseCase(userReposity)
const deleteTrainingUseCase = new DeleteTrainingUseCase(userReposity)
const readTrainingUseCase = new ReadTrainingUseCase(userReposity)
export const trainingController = new TrainingController(
    createTrainingUseCase,
    updateTrainingUseCase,
    deleteTrainingUseCase,
    readTrainingUseCase
)