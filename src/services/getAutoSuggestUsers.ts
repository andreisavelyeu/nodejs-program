import { userList } from '../index';
import { User } from '../types/user';

export const getAutoSuggestUsers = (
    loginSubstring: string,
    limit: number
): User[] => {
    const filteredUserList = Object.values(userList)
        .sort((a, b) => a.login.localeCompare(b.login))
        .filter(({ login }) => login.includes(loginSubstring))
        .slice(0, limit);
    return filteredUserList;
};
