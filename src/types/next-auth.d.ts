import { DefaultSession } from "next-auth";

// Оголошуємо тип для сесії
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            name: string;
        } & DefaultSession["user"]; // Додаємо поля з дефолтного типу
    }

    interface User {
        id: string;
        email: string;
        name: string;
        password?: string; // Якщо потрібно додавати пароль
    }
}