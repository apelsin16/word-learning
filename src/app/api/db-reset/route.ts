import { db } from '@vercel/postgres';

export async function GET() {
    const client = await db.connect();

    try {
        // Початок транзакції
        await client.sql`BEGIN`;

        await client.sql`DROP TABLE IF EXISTS topic_words CASCADE;`;
        await client.sql`DROP TABLE IF EXISTS user_topics CASCADE;`;
        await client.sql`DROP TABLE IF EXISTS word_cards CASCADE;`;
        await client.sql`DROP TABLE IF EXISTS topics CASCADE;`;
        await client.sql`DROP TABLE IF EXISTS users CASCADE;`;

        // Збереження змін
        await client.sql`COMMIT`;

        console.log('Database cleared successfully.');
    } catch (error) {
        console.error('Error initializing database:', error);
        await client.sql`ROLLBACK`;
        return new Response(JSON.stringify({ error: 'Failed to initialize database' }), { status: 500 });
    } finally {
        client.release();
    }
}