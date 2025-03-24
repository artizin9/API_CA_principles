import { Exercise } from "./exercise";
import { User } from "./user";

export class Training {
    constructor (
        public nameTraining: string,
        public levelTraining: string,
        public timeTraining: string,
        public destinedTraining: string,
        public exercises?: Exercise[],
        public user?: User[],
        public readonly id?: string
    ){}
}