'use server';

import bcrypt from "bcrypt";
import {sql} from "@vercel/postgres";
import {z} from "zod";

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
        // Переконайся, що таблиця вже створена
        await sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`;
        await sql`
            CREATE TABLE IF NOT EXISTS users (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                email VARCHAR(255) NOT NULL UNIQUE,
                name VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT now()
            );
        `;

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