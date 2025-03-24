import 'express-session'
import { AccessToken } from './IAuth';

declare module 'express-session' {
    interface SessionData {
        uuid?: string;
        returnUrl?: string;
        token?: AccessToken;
    }
}