import { getDatabase } from "../db/dbConnection.js";

export const createDocument = async (collection, document) => {
    try {
        const db = getDatabase();
        const result = await db.collection(collection).insertOne(document);
        return result;
    } catch (err) {
        console.error("Error creating document " + err);
    }
}

export const readDocuments = async (collection, query) => {
    try {
        const db = getDatabase();
        const result = await db.collection(collection).find(query).toArray();
        return result;
    } catch (err) {
        console.error("Error reading documents " + error);
    }
}

export const updateDocument = async (collection, query, update) => {
    try {
        const db = getDatabase();
        const result = await db.collection(collection).updateOne(query, update);
        return result;
    } catch (err) {
        console.error("Error updating documents " + error);
    }
}