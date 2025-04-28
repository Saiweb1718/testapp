import {z} from 'zod';


export const verifySchema = z.object({
    code:z.string().length(6,{message:"The code must be of length 6"})
});