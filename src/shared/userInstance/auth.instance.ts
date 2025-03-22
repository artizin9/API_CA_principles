import { AuthUser } from "../../infrastructure/controllers/AuthController/authController"
import { PrismaUserRepository } from "../../infrastructure/database/prisma"
import { Login } from "../../use-cases/auth/login"

const IPrismaUserRepository = new PrismaUserRepository()
const login = new Login(IPrismaUserRepository)
export const authController = new AuthUser(login)