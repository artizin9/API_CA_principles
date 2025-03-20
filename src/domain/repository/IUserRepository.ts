import { User } from "../entities/user";

export interface IUserRepository {
    findUnique(email: string): Promise <User | null>
    create(user: User): Promise <void>
}

/* 
IUserRpeository são as funções do database, tipo o prisma, 
findUnique para procurar o user e etc. As questões da promise
entendo cada função detro de uma interface, não pode retorna alguma coisa.
Ela apenas pode tipar. Então eu estou tipando um método que me retorna um user ou nada
depende da forma que você vai precisar. Exemplo, no findUnique eu to procurando
um user com um certo email, então a promise vai me retornar um user.
Caso eu queria apenas criar um user, eu n preciso retorna os users, então posso 
retornar nada.
*/

/*
findUser(id: string): Promise <User | null>
update(id: string): Promise <void>
delete(id: string): Promise <void>
*/