import { Training } from "../entities/training"

export interface ITrainingRepository {
    findUnique(id: string): Promise <Training | null>
    findById(id: string): Promise<Training | null>
    findMany(): Promise <Training[] | null>
    create(training: Training): Promise <void>
    update(training: Training): Promise <void>
    delete(training: Training): Promise <void>
}
