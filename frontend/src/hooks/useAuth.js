import { useState, useCallback } from 'react';
import { authService } from '../services/authService';

export function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = useCallback(async (email, password) => {
        try {
            setLoading(true);
            setError(null);
            const data = await authService.login({ email, password });
            setUser(data);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || 'Login error');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const register = useCallback(async (name, email, password) => {
        try {
            setLoading(true);
            setError(null);
            const data = await authService.register({ name, email, password });
            setUser(data);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || 'Registration error');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        authService.logout();
        setUser(null);
    }, []);

    return {
        user,
        loading,
        error,
        login,
        register,
        logout
    };
}