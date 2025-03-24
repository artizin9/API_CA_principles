import { z } from "zod"

export const exerciseSchema = z.object({
    nameExercise: z.string(),
    numberRep: z.number(),
    numberExec: z.number(),
    execByRep: z.string(),
    interval: z.string(),
})

export type Exercise = z.infer<typeof exerciseSchema>
