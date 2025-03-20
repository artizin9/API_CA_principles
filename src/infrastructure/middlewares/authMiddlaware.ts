import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
import { env } from '../../config/env'

interface UserData {
  id: string
  name: string
  email: string
}

declare module 'fastify' {
  interface FastifyRequest {
    user?: UserData
  }
}

export async function authMiddleware(req: FastifyRequest, res: FastifyReply) {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).send({ error: 'Token inválido' })
    }

    const token = authHeader.replace('Bearer', '')
    const decoded = jwt.verify(token, env.JWT_SECRET) as UserData

    req.user = decoded
  } catch (err) {
    return res.status(401).send({ error: 'Não autorizado' })
  }
}
