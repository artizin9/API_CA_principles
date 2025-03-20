import { authMiddleware } from "./authMiddlaware"

export const authGuard = { preHandler: authMiddleware } 