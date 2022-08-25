import {
    PostgrestMaybeSingleResponse,
    PostgrestResponse,
    PostgrestSingleResponse,
} from '@supabase/supabase-js';

export function handleResponse<T>(
    { error, data }: PostgrestResponse<T>,
    noData = 'Something went wrong'
): T[] {
    if (error) {
        throw new Error(error.message);
    }
    if (data === undefined || data === null) {
        throw new Error(noData);
    }
    return data;
}

export function handleSingleResponse<T>(
    { error, data }: PostgrestSingleResponse<T>,
    noData = 'Something went wrong'
): T {
    if (error) {
        throw new Error(error.message);
    }
    if (data === null) {
        throw new Error(noData);
    }
    return data;
}

export function handleMaybeSingleResponse<T>({
    error,
    data,
}: PostgrestMaybeSingleResponse<T>): T | null {
    if (error) {
        throw new Error(error.message);
    }
    return data;
}
