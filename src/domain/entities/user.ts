import { v4 } from 'uuid';

interface IGenerator { genarate(): string }

class UuidGenerator implements IGenerator {
    genarate(): string {
        return v4()
    }
}

// Esses erros de tipagem não estão acontecendo. Infelizmente o ts não entende o Object.assign(this, user)
export class User {
    public readonly id: string
    public name: string
    public email: string
    public password: string

    constructor(user: Omit<User, "id">, idGenerator: IGenerator, id?: string) {
        this.id = id || idGenerator.genarate()
        Object.assign(this, user)
    }
}

