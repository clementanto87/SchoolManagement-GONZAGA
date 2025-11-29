import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

interface User {
    id: string;
    email: string;
    role: 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';
    firstName?: string;
    lastName?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (token: string, user: User) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined); // No change needed here for now as AuthContext doesn't handle redirects directly.

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                try {
                    // Verify token and get user data
                    // For now, we'll just assume the token is valid if we have it, 
                    // but ideally we should fetch /api/auth/me


                    const response = await axios.get(`${API_URL}/api/auth/me`, {
                        headers: { Authorization: `Bearer ${storedToken}` }
                    });
                    setUser(response.data);
                    setToken(storedToken);
                } catch (error) {
                    console.error('Auth check failed', error);
                    localStorage.removeItem('token');
                    setToken(null);
                    setUser(null);
                }
            }
            setIsLoading(false);
        };

        initAuth();
    }, []);

    const login = (newToken: string, newUser: User) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setUser(newUser);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
