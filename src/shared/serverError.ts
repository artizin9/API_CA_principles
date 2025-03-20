export class ServerError extends Error {
    constructor(public message: string, public statuscode: number = 400){
        super(message)
    }
}