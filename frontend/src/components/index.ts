export interface LoginComponentState {
    email: string;
    password: string;
    errors: any;
}

export interface RegisterComponentState extends LoginComponentState {
    name: string;
    password2: string;
}
