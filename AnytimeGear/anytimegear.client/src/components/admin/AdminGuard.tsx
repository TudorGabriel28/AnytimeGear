import React, { ReactNode, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { jwtDecode } from 'jwt-decode';
import { logout, removeAuthFromSessionStorage } from '../../utils/logout';

const AdminGuard = ({ children }: { children: ReactNode }) => {
    const { accessToken, setAuthContext } = useAuth();

    let role: string|null = null;

    if (accessToken !== null) {
        const decoded = jwtDecode(accessToken!);
        role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    }

    useEffect(() => {
        if (!role || role !== "admin") {
            removeAuthFromSessionStorage();
            setAuthContext({ accessToken: null, expiresIn: null });
        }
    }, [role])
    
    if (!role || role !== "admin") {
        return <Navigate to="/sign-in" />;
    }

    return children as JSX.Element;
};

export default AdminGuard;