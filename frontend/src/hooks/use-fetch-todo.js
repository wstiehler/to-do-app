import { useState, useEffect } from 'react';
import { useAuth } from './use-auth';

export const useFetchTodo = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null);

    const { user, token } = useAuth();

    useEffect(() => {
        if (token) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/todolists`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const result = await response.json();
                    setData(result);
                    setIsLoading(false);
                } catch (error) {
                    setIsError(error);
                    setIsLoading(false);
                }
            };

            fetchData();
        }
    }, [user, token]);

    return { data, isLoading, isError };
};
