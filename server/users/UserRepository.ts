import { Collection } from "mongodb";
import { APIUsers } from "../../shared/interface";
import dotenv from "dotenv";
import { connectToDatabase } from "../DBConnection";
dotenv.config({ path: "../.env" });

async function getCollection(): Promise<Collection> {
  const db = await connectToDatabase();
  return db.collection("users");
}
export async function createOrUpdateUser(user: APIUsers) {
  const collection = await getCollection();
  const userInDatabase = await collection.findOne({ userId: user.userId });

  if (userInDatabase === null) {
    await collection.insertOne(user);
  } else {
    await collection.updateOne(
      { userId: user.userId },
      {
        $set: {
          name: user.name,
          authority: user.authority,
          picture: user.picture,
          email: user.email,
          loginType: user.loginType,
        },
      },
    );
  }
}

export async function getUserById(userId: string): Promise<APIUsers | null> {
  const collection = await getCollection();
  return await collection.findOne<APIUsers>({ userId: userId });
}
