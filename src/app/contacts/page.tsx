"use client";

import {useContact} from "@/hooks/use-contact";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Contact} from "@/components/types/contact";

export default function Page() {
    const {contacts, loading, error} = useContact();

    if (loading) {
        return <p>로딩중..</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Card className="w-full max-w-[1200px]">
                <CardHeader>
                    <CardTitle className="text-2xl">문의 목록</CardTitle>
                    <CardDescription>아래는 문의 목록들입니다.</CardDescription>
                </CardHeader>
                <CardContent>
                    {contacts.length === 0 ? (
                        <p>No contacts available.</p>
                    ) : (
                        <ul className="space-y-4">
                            {contacts.map((contact) => (
                                <ContactCard key={contact.id} contact={contact}/>
                            ))}
                        </ul>
                    )}
                </CardContent>
                <CardFooter>
                    <p>총 {contacts.length}개</p>
                </CardFooter>
            </Card>
        </div>
    );
}

function ContactCard({contact}: { contact: Contact }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">{contact.name} ({contact.email})</CardTitle>
            </CardHeader>
            <CardFooter>
                <span>{contact.message}</span>
            </CardFooter>
        </Card>
    );
}