import React from 'react';
import {getServerSession} from "next-auth";
import {authConfig} from "@/lib/auth.config";
import WordsList from "@/components/words_list";
import Link from "next/link";
import {CiCirclePlus} from "react-icons/ci";

async function Page() {
    const session = await getServerSession(authConfig);
    const userId = session!.user.id;

    return (
        <>
            <div className="flex justify-center">
                <Link href="/words/add" className="flex items-center">
                    <CiCirclePlus size={42}/>
                    Додати слово
                </Link>
            </div>
            <WordsList userId={userId}/>
        </>
    );
}

export default Page;