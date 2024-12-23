import React from 'react';
import {getUserTopics} from "@/lib/actions";

interface ITopicListProps {
    userId: string;
}

async function  TopicsList({userId}: ITopicListProps) {
    const topics = await getUserTopics(userId);
    return (
        <ul>
            {topics.map(({id, name, color}) => (
                <li key={id} className="flex items-center gap-2 mb-2">
                    <div className="w-12 h-12 flex items-center justify-center rounded font-black text-white text-xl"
                         style={{backgroundColor: color ? color : "#d4d4d8"}}
                    >
                        {name[0]}
                    </div>
                    {name}
                </li>
            ))}
        </ul>
    );
}

export default TopicsList;