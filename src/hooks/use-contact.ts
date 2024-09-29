import {useEffect, useState} from "react";
import {Contact} from "@/components/types/contact";

export const useContact = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [posting, setPosting] = useState(false);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch('/api/contact');
                const result = await response.json();
                if (response.ok) {
                    const sortedContacts = result.contact.sort((a: Contact, b: Contact) =>
                        a.name.localeCompare(b.name)
                    );
                    setContacts(sortedContacts);
                } else {
                    setError('Error fetching contacts.');
                }
            } catch {
                setError('Error fetching contacts.');
            } finally {
                setLoading(false);
            }
        };

        fetchContacts().then();
    }, []);

    const addContact = async (newContact: Omit<Contact, 'id'>) => {
        setPosting(true);
        setError(null);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newContact),
            });

            const result = await response.json();
            if (response.ok) {
                setContacts((prevContacts) => {
                    return [...prevContacts, result.contact].sort((a, b) =>
                        a.name.localeCompare(b.name)
                    );
                });
            } else {
                setError('Error adding contact.');
            }
        } catch {
            setError('Error adding contact.');
        } finally {
            setPosting(false);
        }
    };

    return { contacts, loading, error, posting, addContact };
};