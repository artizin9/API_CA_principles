import { z } from 'zod'

export const userSchema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(8)
})

// Tipando o user com sabe do schema dele
type User = z.infer<typeof userSchema>
