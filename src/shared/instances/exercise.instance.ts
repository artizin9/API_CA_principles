import { ExerciseController } from "../../infrastructure/controllers/ExerciseController/exercise.controller"
import { PrismaExerciseRepository } from "../../infrastructure/database/prisma"
import { CreateExerciseUseCase } from "../../use-cases/exercise/createExercise"
import { PrismaTrainingRepository } from "../../infrastructure/database/prisma"

const exerciseReposity = new PrismaExerciseRepository()
const trainingRepository = new PrismaTrainingRepository()
const createExerciseUseCase = new CreateExerciseUseCase(exerciseReposity, trainingRepository)
export const exerciseInstance = new ExerciseController(
    createExerciseUseCase,

)