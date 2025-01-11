'use server';

import bcrypt from "bcrypt";
import {sql} from "@vercel/postgres";
import {z} from "zod";
import {Topic, User, Word} from "@/lib/definitions";

export const getUserByEmail = async (email: string) => {
    const user = await sql<User>`
      SELECT id, name, email, password FROM users WHERE email = ${email};
    `;
    return user;
}

// Схема валідації
const userRegistrationSchema = z.object({
    email: z.string().email('Невірний формат email'),
    password: z.string().min(8, 'Пароль повинен містити щонайменше 8 символів'),
    name: z.string().min(1, 'Ім\'я не може бути порожнім'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Пароль і підтвердження паролю не співпадають',
    path: ['confirmPassword'],
});

export const registerUser = async (
    email: string,
    password: string,
    name: string,
    confirmPassword: string
): Promise<void> => {

    userRegistrationSchema.parse({ email, password, name, confirmPassword });

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Додаємо користувача
        await sql`
            INSERT INTO users (id, email, name, password)
            VALUES (gen_random_uuid(), ${email}, ${name}, ${hashedPassword});
        `;
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('Validation failed:', error.errors);
            throw new Error(error.errors.map((e) => e.message).join(', '));
        }
        console.error('Failed to register user:', error);
        throw new Error('Failed to register user.');
    }
}

const topicSchema = z.object({
    topicName: z.string().min(1, 'Назва теми не може бути порожньою'),
    topicColor: z.string(),
    userId: z.string().min(1),
})

export const createTopic = async (
    topicName: string,
    topicColor: string,
    userId: string
):Promise<void> => {
    console.log("createTopic", topicName, topicColor, userId);
    topicSchema.parse({topicName, topicColor, userId});

    try {
        const result = await sql`
            INSERT INTO topics (name, color, created_by)
            VALUES (${topicName}, ${topicColor}, ${userId})
            RETURNING id;
        `;

        const topicId = result.rows[0]?.id;

        if (!topicId) {
            throw new Error('Failed to create topic: ID not returned');
        }

        await sql`
            INSERT INTO user_topics (user_id, topic_id)
            VALUES (${userId}, ${topicId});
        `
    } catch (err) {
        console.log(err)
    }
}

export const getUserTopics = async (userId: string): Promise<Topic[]> => {
    try {
        const result = await sql<Topic[]>`
            SELECT t.id, t.name, t.color, t.created_at 
            FROM topics t
            JOIN user_topics ut ON t.id = ut.topic_id
            WHERE ut.user_id = ${userId}
            ORDER BY t.created_at DESC
        `;
        const topics = result.rows.flat();
        return topics
    } catch (error) {
        console.error("Помилка отримання тем:", error);
        throw new Error("Не вдалося отримати теми.");
    }
}

export const getUserWords = async (userId: string): Promise<Word[]> => {
    try {
        const result = await sql<Word[]>`
            SELECT wc.*
            FROM word_cards wc
            LEFT JOIN topic_words tw ON wc.id = tw.word_card_id
            WHERE tw.word_card_id IS NULL AND wc.user_id = ${userId};

        `;
        const words = result.rows.flat();
        return words;
    } catch (error) {
        console.error("Помилка отримання слів:", error);
        throw new Error("Не вдалося отримати слова.");
    }
}

const wordSchema = z.object({
    word: z.string().min(1, 'Поле "Слово" не може бути порожнім'),
    translation: z.string().min(1, 'Поле "Переклад" не може бути порожнім'),
    example: z.string(),
    userId: z.string().min(1),
})

export const createWordCard = async (
    word: string,
    translation: string,
    example: string,
    userId: string
):Promise<string> => {
    wordSchema.parse({word, translation, example, userId});

    try {
        const result = await sql`
            INSERT INTO word_cards (word, translation, example, user_id)
            VALUES (${word}, ${translation}, ${example}, ${userId})
            RETURNING id;
        `;
        return result.rows[0].id
    } catch (error) {
        console.error("Помилка додавання слова:", error);
        throw new Error("Не вдалося додати слово.");
    }
}

export const getTopicWords = async (topicId: string): Promise<Word[]> => {
    try {
        const result = await sql`
            SELECT tw.id,
                tw.created_at AS user_id,
                t.name AS topic_name,
                wc.word AS word,
                wc.translation AS translation,
                wc.example AS example
            FROM topic_words tw
            JOIN topics t ON tw.topic_id = t.id
            JOIN word_cards wc ON tw.word_card_id = wc.id
            WHERE tw.topic_id = ${topicId};
        `;

        // Приведення до типу Word[]
        const words: Word[] = result.rows.map(row => ({
            id: row.id,
            name: row.topic_name,
            word: row.word,
            translation: row.translation,
            example: row.example,
            user_id: row.created_at,
        }));
        return words;
    } catch (error) {
        console.error("Помилка отримання слів:", error);
        throw new Error("Не вдалося отримати слова.");
    }
}

export const createTopicWord = async (topicId: string, wordCardId: string): Promise<boolean> => {
    try {
            const result = await sql`
                INSERT INTO topic_words (topic_id, word_card_id)
                VALUES (${topicId}, ${wordCardId})
                ON CONFLICT (topic_id, word_card_id) DO NOTHING
                RETURNING id;
            `;

            return result.rows.length > 0;
    } catch (error) {
        console.error("Помилка додавання слова до топіку:", error);
        throw new Error("Не вдалося додати слово до топіку.");
    }
}





