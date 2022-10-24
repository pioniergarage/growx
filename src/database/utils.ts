import {
    PostgrestMaybeSingleResponse,
    PostgrestResponse,
    PostgrestSingleResponse,
} from '@supabase/supabase-js';

export function handleResponse<T>({
    error,
    data,
    status,
    statusText,
}: PostgrestResponse<T>): T[] {
    if (error) {
        throw error;
    }
    if (data === undefined || data === null) {
        throw new Error(`Received no data: ${status}: ${statusText}`);
    }
    return data;
}

export function handleSingleResponse<T>({
    error,
    data,
    status,
    statusText,
}: PostgrestSingleResponse<T>): T {
    if (error) {
        throw error;
    }
    if (data === null) {
        throw new Error(`Received no data: ${status}: ${statusText}`);
    }
    return data;
}

export function handleMaybeSingleResponse<T>({
    error,
    data,
}: PostgrestMaybeSingleResponse<T>): T | null {
    if (error) {
        throw error;
    }
    return data;
}
