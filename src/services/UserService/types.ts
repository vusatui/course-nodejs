export type User = {
    login: string;
    password: string;
    age: number;
};

export type UserDB = User & {
    id: string;
    deleted: boolean;
};
