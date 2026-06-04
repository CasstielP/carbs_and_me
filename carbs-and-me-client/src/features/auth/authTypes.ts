export type User = {
    id: number;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
};

export type AuthState = {
    user: User | null;
    isLoading: boolean;
    error: string | null;
}