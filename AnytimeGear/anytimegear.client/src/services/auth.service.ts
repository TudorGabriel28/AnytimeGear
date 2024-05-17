import { ILoginRequest } from "../models/login-request.model";
import { ILoginResponse } from "../models/login-response.model";
import { IRegisterRequest } from "../models/register-request.model";
import { IRegisterResponse } from "../models/register-response.model";
import { apiPostClient } from "../utils/api-client";

class AuthService {

    public async register(payload: IRegisterRequest): Promise<IRegisterResponse> {
        try {
         
            const response = await apiPostClient.post('/account/register', payload)
            return response.data as IRegisterResponse;
        }
        catch (error: any) {
            console.error(error);

            const errorResponse: IRegisterResponse = { succeeded: false, message: "Something went wrong.", errors: [error?.message] }
            return errorResponse;
        }
    }

    public async login(payload: ILoginRequest): Promise<ILoginResponse> {

        const apiClient = apiPostClient;
        apiClient.defaults.baseURL = 'https://localhost:7148/';

        try {
            const response = await apiClient.post('/login', payload);
            return response.data as ILoginResponse;
        }
        catch (error: any) {
            console.error(error);

            const errorResponse: ILoginResponse = { accessToken: null, refreshToken: null, expiresIn: 0, tokenType: "Bearer" };
            return errorResponse;
        }
    }
}
export const authService = new AuthService();