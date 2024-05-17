import React, { useState } from 'react';
import { authService } from '../../../services/auth.service';
import { ILoginRequest } from '../../../models/login-request.model';
import { TextField } from '@mui/material';
import '../IdentityPageLayout.css';
import { useAuth } from '../../../auth/AuthContext';

interface RegisterFormState {
    email: string;
    password: string;
}

const SignInPage = () => {
    const [formData, setFormData] = useState<RegisterFormState>({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState<string>('');
    const { setAuthContext } = useAuth();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const loginRequest: ILoginRequest = { ...formData };
        const { accessToken, refreshToken, expiresIn } = await authService.login(loginRequest);

        if (accessToken) {
            setMessage("Successfully logged-in!");
            setAuthContext({ accessToken, refreshToken, expiresIn });
        } else {
            setMessage("Username or password is wrong.");
        }
    };

    return (
        <div className="outer-page-container">
            <div className="page-container">
                <div>
                    <h2>Welcome!</h2>
                </div>
                <div>
                  <form onSubmit={handleSubmit}>
                    <div>
                        <TextField
                            type="email"
                            name="email"
                            label="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <TextField
                            type="password"
                            name="password"
                            label="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Sign-in</button>
                </form>
                </div>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default SignInPage;