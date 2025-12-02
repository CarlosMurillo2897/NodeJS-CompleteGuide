import { Database, MongoClient } from "https://deno.land/x/mongo/mod.ts";

let db: Database;

export async function connect() {
    const client = new MongoClient();
    await client.connect(
        'mongodb+srv://cmb2808:root2@common.b7p2yss.mongodb.net/deno?authMechanism=SCRAM-SHA-1'
    );
    console.log('Database connection was successful!');
    db = client.database('deno');
}


export function getDB() {
    return db;
}