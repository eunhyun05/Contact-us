"use client";

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {useContact} from "@/hooks/use-contact";
import {useForm, FormProvider} from "react-hook-form";
import {FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {ContactSchema} from "@/schemas";
import {useToast} from "@/hooks/use-toast";
import Link from "next/link";

export default function Home() {
    const {addContact} = useContact();
    const {toast} = useToast();

    const formMethods = useForm<z.infer<typeof ContactSchema>>({
        resolver: zodResolver(ContactSchema),
        defaultValues: {
            name: "",
            email: "",
            message: ""
        },
    });

    const {handleSubmit, control, reset} = formMethods;

    async function onSubmit(values: z.infer<typeof ContactSchema>) {
        await addContact(values);
        reset();

        toast({
            title: "성공",
            description: "문의 내용을 제출하였습니다.",
        });
    }

    return (
        <main>
            <Button asChild className="absolute right-4 top-4 font-bold">
                <Link href="/contacts">
                    문의 목록
                </Link>
            </Button>
            <FormProvider {...formMethods}>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center h-screen">
                    <Card className="w-full max-w-[540px]">
                        <CardHeader>
                            <CardTitle className="text-2xl">문의하기</CardTitle>
                            <CardDescription>문의 내용을 입력 후, 제출 버튼을 눌러주세요.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <FormField
                                control={control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input type="text" placeholder="이름" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input type="email" placeholder="이메일" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="message"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                placeholder="문의 내용을 입력해 주세요."
                                                className="resize-none h-48"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full">
                                제출하기
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </FormProvider>
        </main>
    );
}