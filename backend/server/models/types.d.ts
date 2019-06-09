declare module 'Models' {
    import { Document } from 'mongoose';

    export interface UserDoc extends Document {
        name: string;
        email: string;
        password: string;
        date: Date;
    }
}
