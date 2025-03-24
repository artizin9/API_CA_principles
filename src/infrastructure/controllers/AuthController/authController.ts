import { FastifyReply, FastifyRequest } from "fastify";
import { Login } from "../../../use-cases/auth/login";

export class AuthUser {
    constructor(private auth: Login){}

    async authUser(req: FastifyRequest, res: FastifyReply){
        const { email, password } = req.body as {email: string, password: string}
        await this.auth.execute({email, password})
        res.status(200).send({Message: "Usuário autenticado"})
    }
}