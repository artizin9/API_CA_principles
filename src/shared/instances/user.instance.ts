import { UserController } from "../../infrastructure/controllers/UserController/userController"
import { CreateUserUseCase } from "../../use-cases/user/createUser"
import { UpdateUserUseCase } from "../../use-cases/user/updateUser"
import { DeleteUseruseCase } from "../../use-cases/user/deleteUser"
import { ReadUseruseCase } from "../../use-cases/user/readUser"
import { PrismaUserRepository } from "../../infrastructure/database/prisma"

const userReposity = new PrismaUserRepository()
const createUserUseCase = new CreateUserUseCase(userReposity)
const updateUserUseCase = new UpdateUserUseCase(userReposity)
const deleteUserUseCase = new DeleteUseruseCase(userReposity)
const readUseruseCase = new ReadUseruseCase(userReposity)
export const userController = new UserController(
    createUserUseCase,
    updateUserUseCase, 
    deleteUserUseCase, 
    readUseruseCase
)