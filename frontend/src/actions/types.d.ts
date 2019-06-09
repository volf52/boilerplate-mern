declare module 'Actions' {
    export interface RegisterData {
        name: string;
        email: string;
        password: string;
    }

    export enum ActionTypes {
        GET_ERRORS = 'GET_ERRORS',
        USER_LOADING = 'USER_LOADING',
        SET_CURRENT_USER = 'SET_CURRENT_USER',
    }
}
