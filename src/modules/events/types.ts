import { Database } from "database/DatabaseDefition";

export type GrowEvent = Omit<Database["public"]["Tables"]["events"]["Row"], "date" | "inserted_at" | "updated_at"> & {
    date: Date
}
