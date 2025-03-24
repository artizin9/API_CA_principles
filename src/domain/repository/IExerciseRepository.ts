import { Exercise } from "../entities/exercise"

export interface IExerciseRepository {
    findUnique(id: string): Promise <Exercise | null>
    findByIdOrEmail(id: string, email: string): Promise<Exercise | null>
    findMany(): Promise <Exercise[] | null>
    create(exercise: Exercise): Promise <void>
    update(exercise: Exercise): Promise <void>
    delete(exercise: Exercise): Promise <void>
}
