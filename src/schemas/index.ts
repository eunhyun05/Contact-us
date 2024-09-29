import {z} from "zod";

export const ContactSchema = z.object({
    name: z.string().min(2, {message: "2자 이상"}),
    email: z.string().email({message: "이메일 형식이 맞지 않습니다."}),
    message: z.string().min(5, {message: "5자 이상"})
});