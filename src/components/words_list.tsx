import React from 'react';
import {Word} from "@/lib/definitions";
import {getUserWords} from "@/lib/actions";
import WordCard from "@/components/word-card";

interface IWordsListProps {
    userId: string
}

async function WordsList ({userId}: IWordsListProps) {
    const words = await getUserWords(userId);
 return (
     <ul className="flex gap-2 flex-wrap">
         {words.map((word: Word) => (
             <li key={word.id}>
                 <WordCard word={word.word} translation={word.translation} example={word.example} />
             </li>
         ))}
     </ul>
 );}

export default WordsList;