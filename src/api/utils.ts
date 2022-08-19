import {
    PostgrestError,
    PostgrestMaybeSingleResponse,
    PostgrestResponse,
    PostgrestSingleResponse,
} from '@supabase/supabase-js';

export type SupabaseResponse<T> = { data?: T; error?: PostgrestError | null };
export function mapResponse<DataIn, DataOut>(
    response: PostgrestResponse<DataIn>,
    mapper: (data: DataIn) => DataOut
): SupabaseResponse<DataOut[]> {
    const { data, error } = response;
    if (!data) {
        return { error };
    }
    return { data: data.map(mapper) };
}

export function mapSingleResponse<DataIn, DataOut>(
    response: PostgrestSingleResponse<DataIn> | PostgrestMaybeSingleResponse<DataIn>,
    mapper: (data: DataIn) => DataOut
): SupabaseResponse<DataOut> {
    const { data, error } = response;
    if (!data) {
        return { error };
    }
    return { data: mapper(data) };
}
