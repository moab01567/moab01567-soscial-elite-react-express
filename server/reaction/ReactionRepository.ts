import dotenv from "dotenv";
import { Collection } from "mongodb";
import {
  APIReaction,
  ReactionsEmoji,
} from "../../shared/ReactionsInterfaceAndEnum";
import { connectToDatabase } from "../DBConnection";

dotenv.config({ path: "../.env" });

async function getCollection(): Promise<Collection> {
  const db = await connectToDatabase();
  return db.collection("reactions");
}

export async function getReactionsWithArticleIds(
  articleId: string,
): Promise<APIReaction[]> {
  const collection = await getCollection();
  return await collection.find<APIReaction>({ articleId: articleId }).toArray();
}

export async function getReactionsByUserId(
  userId: string,
): Promise<APIReaction[]> {
  const collection = await getCollection();
  return await collection.find<APIReaction>({ userId: userId }).toArray();
}

export async function addNewReaction(newReaction: APIReaction) {
  const collection = await getCollection();
  await collection.insertOne(newReaction);
}
export async function deleteReaction(reactionId: string) {
  const collection = await getCollection();
  await collection.deleteOne({ reactionId: reactionId });
}

export async function putReaction(
  reactionId: string,
  reactionEmoji: ReactionsEmoji,
) {
  const collection = await getCollection();
  await collection.updateOne(
    { reactionId: reactionId },
    { $set: { reactionEmoji: reactionEmoji } },
  );
}
