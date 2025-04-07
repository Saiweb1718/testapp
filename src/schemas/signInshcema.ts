import {z} from 'zod';


export const signInschema = z.object({
    username : z.string(),
    password : z.string(),
});