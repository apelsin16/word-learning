export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export type Topic = {
    id: number;
    name: string;
    color: string;
}

export type Word = {
    id: string;
    user_id: string;
    word: string;
    translation: string;
    example: string
}