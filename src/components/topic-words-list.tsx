import React, {useEffect, useState} from 'react';
import {Word} from "@/lib/definitions";
import {getTopicWords} from "@/lib/actions";
import WordCard from "@/components/word-card";

interface ITopicWordsListProps {
    topicId: string;
}

function TopicWordsList({topicId}: ITopicWordsListProps) {
    const [words, setWords] = useState<Word[]>([]);

    useEffect(() => {
        const fetchWords = async() => {
            if (topicId) {
                const result = await getTopicWords(topicId);
                setWords(result)
            }
        }

        fetchWords()
    },[]);

    if(!words || words?.length === 0) {
        return (
            <p>В цій категорії поки що немає слів</p>
        )
    }

    return (
        <ul  className="flex gap-2 flex-wrap">
            {words && words.map(({id, word, translation, example}: Word) => (
                <li key={id}>
                    <WordCard word={word} translation={translation} example={example}/>
                </li>
            ))}
        </ul>
    );
}

export default TopicWordsList;