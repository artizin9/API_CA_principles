import { ExerciseController } from "../../infrastructure/controllers/ExerciseController/exercise.controller"
import { PrismaExerciseRepository } from "../../infrastructure/database/prisma"
import { CreateExerciseUseCase } from "../../use-cases/exercise/createExercise"
import { PrismaTrainingRepository } from "../../infrastructure/database/prisma"
import { UpdateExerciseUseCase } from "../../use-cases/exercise/updateExercise"
import { DeleteExerciseUseCase } from "../../use-cases/exercise/deleteExercise"
import { ReadExerciseUseCase } from "../../use-cases/exercise/readExercise"

const exerciseReposity = new PrismaExerciseRepository()
const trainingRepository = new PrismaTrainingRepository()
const createExerciseUseCase = new CreateExerciseUseCase(exerciseReposity, trainingRepository)
const updateExerciseUseCase = new UpdateExerciseUseCase(exerciseReposity, trainingRepository)
const deleteExerciseUseCase = new DeleteExerciseUseCase(exerciseReposity, trainingRepository)
const readExerciseUseCase = new ReadExerciseUseCase(trainingRepository)

export const exerciseInstance = new ExerciseController(
    createExerciseUseCase,
    updateExerciseUseCase,
    deleteExerciseUseCase,
    readExerciseUseCase
)