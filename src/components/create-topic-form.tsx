'use client';

import React from 'react';
import Button from "@/components/button";
import {createTopic} from "@/lib/actions";
import {useRouter} from "next/navigation";

interface ICreateTopicFormProps {
    userId: string
}

function CreateTopicForm({userId}: ICreateTopicFormProps) {
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const form = e.currentTarget;
            const formData = new FormData(form);

            const topicName = formData.get("topicName") as string;
            const topicColor = formData.get("topicColor") as string;

            await createTopic(topicName, topicColor, userId);

            form.reset();
            router.push("/topics");
        } catch (e) {
            console.log(e, "Не вдалося створити тему")
        }
    }
    return (
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <div className="mb-5">
                <label htmlFor="topicName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Тема
                </label>
                <input
                    type="text"
                    id="topicName"
                    name="topicName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Введіть назву теми"
                    required
                />
            </div>
            <div className="mb-5">
                <label htmlFor="topicName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Колір
                </label>
                <input
                    type="color"
                    id="topicColor"
                    name="topicColor"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                />
            </div>
            <Button text="Створити" type='submit' variant='primary' />
        </form>
    );
}

export default CreateTopicForm;