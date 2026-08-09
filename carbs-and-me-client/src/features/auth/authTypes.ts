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

export type LoginCredentials =  {
    email: string;
    password: string;
}


export type SignupCredentials = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};
