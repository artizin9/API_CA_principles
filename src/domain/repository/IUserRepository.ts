import { User } from "../entities/user";

export interface IUserRepository {
    findUnique(email: string): Promise <User | null>
    findByIdOrEmail(id: string, email: string): Promise<User | null>
    findMany(): Promise <User[] | null>
    create(user: User): Promise <void>
    update(user: User): Promise <void>
    delete(user: User): Promise<void>
}
