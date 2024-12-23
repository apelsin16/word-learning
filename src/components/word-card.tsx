'use client';

import React from 'react';
import clsx from "clsx";

interface IWordCardProps {
    word: string;
    translation: string;
    example: string;
}

function WordCard ({word, translation, example}: IWordCardProps) {

    const [isOpen, setIsOpen] = React.useState(false);

 return (
     <div
         className="w-[200px] h-[100px] perspective"
         onClick={() => setIsOpen(!isOpen)}
     >
         <div
             className={clsx(
                 "relative w-full h-full transform-style-preserve-3d transition-transform duration-700",
                 {"rotate-y-180": isOpen}
             )}
         >
             {/* Передня сторона картки */}
             <div
                 className="absolute w-full h-full bg-blue-500 text-white flex items-center justify-center backface-hidden rounded-xl">
                 <p>{word}</p>
             </div>
             {/* Задня сторона картки */}
             <div
                 className="absolute w-full h-full bg-green-500 text-white flex flex-col items-center justify-center backface-hidden rounded-xl transform rotate-y-180">
                 <p>{translation}</p>
                 <p className="text-sm mt-2">{example}</p>
             </div>
         </div>
     </div>
 );
};

export default WordCard;