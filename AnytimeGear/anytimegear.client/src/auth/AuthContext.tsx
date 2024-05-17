import { createContext, useContext, useState } from 'react';

interface AuthContext {
    accessToken: string | null;
    refreshToken: string | null;
    expiresIn: number | null;
    setAuthContext: (authData: { accessToken: string | null, refreshToken: string | null, expiresIn: number | null }) => void;
}

const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessTokenState] = useState<string | null>(sessionStorage.getItem('accessToken'));
    const [refreshToken, setRefreshTokenState] = useState<string | null>(sessionStorage.getItem('refreshToken'));
    const [expiresIn, setExpiresInState] = useState<number | null>(Number(sessionStorage.getItem('expiresIn')) || null);

    const setAuthContext = (authData: { accessToken: string | null, refreshToken: string | null, expiresIn: number }) => {

        if (authData.accessToken) {
            sessionStorage.setItem('accessToken', authData.accessToken);
        } else {
            sessionStorage.removeItem('accessToken');
        }

        if (authData.refreshToken) {
            sessionStorage.setItem('refreshToken', authData.refreshToken);
        } else {
            sessionStorage.removeItem('refreshToken');
        }

        if (authData.expiresIn) {
            sessionStorage.setItem('expiresIn', authData.expiresIn.toString());
        } else {
            sessionStorage.removeItem('expiresIn');
        }

        setAccessTokenState(authData.accessToken);
        setRefreshTokenState(authData.refreshToken);
        setExpiresInState(authData.expiresIn);
    };

    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, expiresIn, setAuthContext }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContext => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
