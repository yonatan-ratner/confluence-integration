import 'express-session'
import { AccessToken } from './IAuth';

declare module 'express-session' {
    // extends 'express-session' types/interfaces without needing to import this file!
    interface SessionData {
        uuid?: string;
        returnUrl?: string;
        token?: AccessToken;
    }
}