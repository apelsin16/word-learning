'use client';

import React, {JSX, use} from 'react';
import {useSearchParams} from "next/navigation";
import Link from "next/link";
import {CiCirclePlus} from "react-icons/ci";
import TopicWordsList from "@/components/topic-words-list";

interface PageProps {
    params: Promise<{ slug: string }>
}

function Page({params}: PageProps):  JSX.Element {

    const { slug } = use(params);

    const searchParams = useSearchParams();
    const id = searchParams.get("id") as string;
    const name = searchParams.get("name");
    const color = searchParams.get("color");

    return (
        <div>
            <h2
                className="capitalize text-3xl font-bold p-4 mb-4 text-white rounded-lg"
                style={{backgroundColor: color ?? "transparent"}}
            >
                {name}
            </h2>
            <div className="flex justify-center">
                <Link
                    href={`/topics/${[slug]}/add?id=${id}&name=${name}&color=${encodeURIComponent(color)}`}
                    className="flex items-center"
                >
                    <CiCirclePlus size={42}/>
                    Додати слово в категорію
                </Link>
            </div>
            <TopicWordsList topicId={id}  />

        </div>
    );
}

export default Page;