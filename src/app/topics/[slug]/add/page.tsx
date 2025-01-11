'use client';

import React, {use} from 'react';
import CreateWordForm from "@/components/create-word-form";
import {useSession} from "next-auth/react";
import {useSearchParams} from "next/navigation";

interface PageProps {
    params: Promise<{ slug: string }>;
}

function Page({params}: PageProps) {
    const { slug } = use(params);
    const { data: session } = useSession()
    const userId = session!.user.id;

    const searchParams = useSearchParams();
    const topicId = searchParams.get("id") as string;
    const name = searchParams.get("name") as string;
    const color = searchParams.get("color") as string;

    return (
        <div>
            <h2>Додати слово в категорію {name}</h2>
            <CreateWordForm
                userId={userId}
                topicId={topicId}
                slug={slug}
                topicName={name}
                topicColor={color}
            />
        </div>
    );
}

export default Page;