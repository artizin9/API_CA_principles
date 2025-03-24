import { FastifyInstance } from "fastify"
import { createUser as register, updateUser, deleteUser, readUser } from "./userRoutes"
import { authRoutes } from "./authRoutes"
import { createTraining, updateTraining, deleteTraining, readTraining } from "./trainingRoutes"
import { createExercise } from "./exerciseRoutes"

const routes = [ register, updateUser, deleteUser, readUser, authRoutes, createTraining, updateTraining, deleteTraining, readTraining, createExercise ]
export const registerRoutes = (fastify: FastifyInstance) => routes.forEach(
    route => fastify.register(route)
)