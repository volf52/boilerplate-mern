declare module 'Validation' {
    export type LoginData = {
        email: string;
        password: string;
    };

    export type RegisterData = {
        name: string;
        email: string;
        password: string;
        password2: string;
    };
}
