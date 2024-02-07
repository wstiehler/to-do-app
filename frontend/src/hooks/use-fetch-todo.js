import { useState, useEffect } from 'react';

export const useFetchTodo = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null);

    useEffect(() => {
        if (token) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/todolists`, {
                        headers: {
                            'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
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
    }, []);

    return { data, isLoading, isError };
};
