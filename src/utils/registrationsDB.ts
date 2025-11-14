import { openDB } from "idb";

const DB_NAME = "app-db";
const STORE = "registrations";

export async function getDB() {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE)) {
                db.createObjectStore(STORE, { keyPath: "id", autoIncrement: true });
            }
        }
    });
}

export async function getAllRegistrations() {
    const db = await getDB();
    return db.getAll(STORE) as Promise<{ id: string, user: string, event: string }[]>; // returns array of { id, user, event }
}

export async function addRegistration(user: string, event: string) {
    const db = await getDB();
    return db.add(STORE, { user, event });
}

export async function clearRegistrations() {
    const db = await getDB();
    return db.clear(STORE);
}
