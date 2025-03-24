import { z } from 'zod'

export const trainingSchema = z.object({
    nameTraining: z.string().min(3).max(255),
    levelTraining: z.string(),
    timeTraining: z.string().min(8),
    destinedTraining: z.string(),
})

type Training = z.infer<typeof trainingSchema>