import React from 'react';
import CreateTopicForm from "@/components/create-topic-form";
import {getServerSession} from "next-auth";
import {authConfig} from "@/lib/auth.config";

async function Page() {
    const session = await getServerSession(authConfig);
    if (!session || !session.user) {
        return (
            <div>
                <h2 className="font-bold text-3xl">Create topic</h2>
                <p>Ви повинні бути залогінені, щоб створити тему.</p>
            </div>
        );
    }

    const userId = session.user.id;

    return (
        <div>
            <h2 className="font-bold text-3xl">Створити тему</h2>
            <CreateTopicForm userId={userId}/>
        </div>
    );
}

export default Page;