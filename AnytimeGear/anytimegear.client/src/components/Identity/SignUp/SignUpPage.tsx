import React, { useState } from 'react';
import { authService } from '../../../services/auth.service';
import { IRegisterRequest } from '../../../models/register-request.model';
import { TextField } from '@mui/material';
import '../IdentityPageLayout.css';
import { useNavigate } from 'react-router-dom';

interface RegisterFormState {
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
}

const SignUpPage = () => {

    const [formData, setFormData] = useState<RegisterFormState>({
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        firstName: '',
        lastName: '',
    });

    const [message, setMessage] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        const registerRequest: IRegisterRequest = { ...formData };
        const response = await authService.register(registerRequest);

        if (response.succeeded) {
            setMessage('Registration successful!');
        } else {
            setMessage('Registration failed. Please try again.');
        }
        navigate("/")
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
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <TextField
                        type="text"
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <TextField
                        type="text"
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <TextField
                        type="tel"
                        name="phoneNumber"
                        label="Phone Number"
                        value={formData.phoneNumber}
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
                <div>
                    <TextField
                        type="password"
                        name="confirmPassword"
                        label="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Sign-up</button>
                    </form>
                </div>
            {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default SignUpPage;