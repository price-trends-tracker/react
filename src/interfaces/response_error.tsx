export interface AuthError {
    token_missing: boolean,
    token_invalid?: boolean,
    user_invalid?: boolean,
};
