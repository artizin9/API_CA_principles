export class Exercise {
    constructor(
        public nameExercise: string,
        public numberRep: number,
        public numberExec: number,
        public execByRep: string,
        public interval: string,
        public readonly id?: string,
    ){}
}