export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    token: string;
}

export interface AuthError {
    message: string;
    error?: string;
}