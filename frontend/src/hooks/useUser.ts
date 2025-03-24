import { useState, useEffect } from 'react';
import api from '../services/api';

interface User {
    _id: string;
    name: string;
    email: string;
}

export const useUser = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUserData = async () => {
        try {
            const response = await api.get('/auth/user');
            setUser(response.data);
            setError(null);
        } catch (err) {
            setError('Error fetching user data');
            console.error('Error fetching user data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return { user, loading, error, fetchUserData };
};

export default useUser; 