import React from 'react';
import {getUserTopics} from "@/lib/actions";
import Link from "next/link";
import slugify from "slugify";


interface ITopicListProps {
    userId: string;
}

async function  TopicsList({userId}: ITopicListProps) {
    const topics = await getUserTopics(userId);
    return (
        <ul>
            {topics.map(({id, name, color}) => {
                const slug = slugify(name, { lower: true, strict: true, locale: "uk" });
                return (
                    <li key={id}>
                        <Link
                            href={`/topics/${slug}?id=${id}&name=${name}&color=${encodeURIComponent(color)}`}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-12 h-12 flex items-center justify-center rounded font-black text-white text-xl"
                                     style={{backgroundColor: color ? color : "#d4d4d8"}}
                                >
                                    {name[0]}
                                </div>
                                {name}
                            </div>
                        </Link>
                    </li>
                )})
            }
        </ul>
    );
}

export default TopicsList;