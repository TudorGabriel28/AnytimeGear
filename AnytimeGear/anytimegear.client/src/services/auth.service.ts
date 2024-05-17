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

        try {
            const response = await apiPostClient.post('/account/login', payload);
            return response.data as ILoginResponse;
        }
        catch (error: any) {
            console.error(error);

            const errorResponse: ILoginResponse = { accessToken: null,  expiresIn: 0 };
            return errorResponse;
        }
    }
}
export const authService = new AuthService();