export type UserList = {
    [id: string]: User;
};

export type User = {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
};
