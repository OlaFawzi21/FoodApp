export interface DecodeToken {
    exp: number;
    iat: number;
    roles: string[];
    userEmail: string;
    userGroup: string;
    userId: number;
    userName: string;
}
