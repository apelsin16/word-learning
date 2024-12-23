import { db } from '@vercel/postgres';

export async function GET() {
    const client = await db.connect();

    try {
        // Початок транзакції
        await client.sql`BEGIN`;

        // Створення таблиці `users`
        await client.sql`
            CREATE TABLE IF NOT EXISTS users (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                email VARCHAR(255) NOT NULL UNIQUE,
                name VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT now()
            );
        `;

        // Створення таблиці `topics`
        await client.sql`
            CREATE TABLE IF NOT EXISTS topics (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name VARCHAR(255) NOT NULL,
                color VARCHAR(255) NOT NULL,
                created_by UUID REFERENCES users(id) ON DELETE CASCADE,
                created_at TIMESTAMP DEFAULT now()
            );
        `;

        // Створення таблиці `user_topics`
        await client.sql`
            CREATE TABLE IF NOT EXISTS user_topics (
                user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
                PRIMARY KEY (user_id, topic_id)
            );
        `;
        //створення таблиці word_cards
        await client.sql`
            CREATE TABLE IF NOT EXISTS word_cards (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                word VARCHAR(255) NOT NULL,
                translation VARCHAR(255) NOT NULL,
                example TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

        //створення таблиці topic_words (багато-до-багатьох)
        await client.sql`
            CREATE TABLE topic_words (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
                word_card_id UUID REFERENCES word_cards(id) ON DELETE CASCADE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE (topic_id, word_card_id) -- Унікальна пара, щоб уникнути дублікатів
            );
        `;

        // Завершення транзакції
        await client.sql`COMMIT`;

        return new Response(JSON.stringify({ message: 'Database initialized successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error initializing database:', error);
        await client.sql`ROLLBACK`;
        return new Response(JSON.stringify({ error: 'Failed to initialize database' }), { status: 500 });
    } finally {
        client.release();
    }
}
