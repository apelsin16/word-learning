import React from 'react';
import { CiCirclePlus } from "react-icons/ci";
import Link from "next/link";
import TopicsList from "@/components/topics-list";
import {getServerSession} from "next-auth";
import {authConfig} from "@/lib/auth.config";

async function Page() {
    const session = await getServerSession(authConfig);
    const userId = session!.user.id;

    return (
        <>
            <div className="flex justify-center">
                <Link href="/topics/add" className="flex items-center">
                    <CiCirclePlus size={42}/>
                    Додати тему
                </Link>
            </div>
            <TopicsList userId={userId}/>
        </>
    );
}

export default Page;