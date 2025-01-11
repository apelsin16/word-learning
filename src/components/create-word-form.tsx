'use client';

import React from 'react';
import {createTopicWord, createWordCard} from "@/lib/actions";
import {useRouter} from "next/navigation";
import Button from "@/components/button";

interface ICreateWordFormProps {
    userId: string;
    topicId?: string;
    slug?: string;
    topicName?: string;
    topicColor?: string;
}

function CreateWordForm({userId, topicId, slug, topicName, topicColor}: ICreateWordFormProps) {
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const form = e.currentTarget;
            const formData = new FormData(form);

            const word = formData.get("word") as string;
            const translation = formData.get("translation") as string;
            const example = formData.get("example") as string;

            const wordCardId = await createWordCard(word, translation, example, userId);

            if(topicId) {
                await createTopicWord(topicId, wordCardId)
            }

            form.reset();
            if(topicId && topicColor) {
                router.push(
                    `/topics/${slug}?id=${topicId}&name=${topicName}&color=${encodeURIComponent(topicColor)}`
                );
            } else {
                router.push("/words");
            }
        } catch (error) {
            console.log(error, "Не вдалося створити слово")
        }
    }

    return (
        <form  className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <div className="mb-5">
                <label htmlFor="word" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Слово
                </label>
                <input
                    type="text"
                    id="word"
                    name="word"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Введіть слово"
                    required
                />
            </div>
            <div className="mb-5">
                <label htmlFor="translation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Переклад
                </label>
                <input
                    type="text"
                    id="translation"
                    name="translation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Введіть переклад"
                    required
                />
            </div>
            <div className="mb-5">
                <label htmlFor="example" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Приклад застосування
                </label>
                <input
                    type="text"
                    id="example"
                    name="example"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Введіть приклад"
                />
            </div>
            <Button text="Створити" type='submit' variant='primary' />
        </form>
    );
}

export default CreateWordForm;