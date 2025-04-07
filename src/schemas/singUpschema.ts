import {z} from 'zod';

const usernameValidation = z
    .string()
    .min(2,"Atleast 2 characters are required")
    .max(20,"Username should not be more than 20 characters")
    .regex(/^[a-zA-Z0-9]+$/, "Username should only contain letters and numbers")
    

export const signUpschema =  z.object({
    username:usernameValidation,
    email: z.string().email({message:"Invalid email"}),
    password: z.string().min(8,{message:"Password should be at least 8 characters"})
})  