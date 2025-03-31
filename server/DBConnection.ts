import dotenv from "dotenv";
import { Db, MongoClient } from "mongodb";

dotenv.config({ path: "../.env" });
const dataBaseConfig = {
  uri: process.env.DATABASE_URL,
  database: process.env.DATABASE,
};

const client = new MongoClient(dataBaseConfig.uri as string);
let db: Db;
export async function connectToDatabase(): Promise<Db> {
  if (!db) {
    await client.connect();
    db = client.db(dataBaseConfig.database as string);
  }
  return db;
}
