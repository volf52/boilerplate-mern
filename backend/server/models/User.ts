import { UserDoc } from 'Models';
import { model, Schema } from 'mongoose';

// Create the schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

export const User = model<UserDoc>('users', UserSchema);
