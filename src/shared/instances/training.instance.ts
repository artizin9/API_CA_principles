import { TrainingController } from "../../infrastructure/controllers/TrainingController/training.controller"
import { PrismaTrainingRepository } from "../../infrastructure/database/prisma"
import { CreateTrainingUseCase } from "../../use-cases/training/createTraining"
import { UpdateTrainingUseCase } from "../../use-cases/training/updateTraining"
import { DeleteTrainingUseCase } from "../../use-cases/training/deleteTraining"
import { ReadTrainingUseCase } from "../../use-cases/training/readTraining"

const trainingRepository = new PrismaTrainingRepository()
const createTrainingUseCase = new CreateTrainingUseCase(trainingRepository)
const updateTrainingUseCase = new UpdateTrainingUseCase(trainingRepository)
const deleteTrainingUseCase = new DeleteTrainingUseCase(trainingRepository)
const readTrainingUseCase = new ReadTrainingUseCase(trainingRepository)
export const trainingInstance = new TrainingController(
    createTrainingUseCase,
    updateTrainingUseCase,
    deleteTrainingUseCase,
    readTrainingUseCase
)