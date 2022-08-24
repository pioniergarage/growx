import { SupabaseResponse } from 'api/utils';
import { useState, useEffect, DependencyList } from 'react';

export default function useLoadingValue<T>({
    defaultValue,
    defaultErrorMessage = 'Something went wrong',
    supplier,
    dependencies = [],
}: {
    supplier: () => Promise<SupabaseResponse<T>>;
    defaultValue: T;
    defaultErrorMessage?: string;
    dependencies?: DependencyList;
}) {
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState<T>(defaultValue);
    const [error, setError] = useState('');
    useEffect(() => {
        (async () => {
            setLoading(true);
            const { data, error } = await supplier();
            setLoading(false);
            if (error || !data) {
                setError(error?.message || defaultErrorMessage);
                return;
            }
            setValue(data);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);
    return { loading, value, error, setValue };
}
