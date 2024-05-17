export interface ILoginResponse {
    tokenType: string;
    accessToken: string | null;
    refreshToken: string | null;
    expiresIn: number | null;
}