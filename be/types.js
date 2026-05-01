import {z} from 'zod';
export const SignupType = z.object({
    email: z.string().email(),
    password:z.string().min(8),
    name:z.string().min(1),
    pincode:z.string().regex(/^\d{6}$/, "Pincode must be exactly 6 digits"),

})
export const SigninType = z.object({
    email:z.string().email(),
    password:z.string().min(8),

})
