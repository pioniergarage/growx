import { Database } from "database/DatabaseDefition";

export type GrowEvent = Omit<Database["public"]["Tables"]["events"]["Row"], "date"> & {
    date: Date
}

