import { Training } from "./training";

export class User {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public training?: Training[],
        public readonly id?: string,
    ) { }
}

