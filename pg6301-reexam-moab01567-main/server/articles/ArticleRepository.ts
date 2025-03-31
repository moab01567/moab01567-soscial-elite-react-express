import dotenv from "dotenv";
import { Collection } from "mongodb";

import { APIArticle } from "../../shared/ArticlesInterfaceAndEnum";
import { connectToDatabase } from "../DBConnection";

dotenv.config({ path: "../.env" });

async function getCollection(): Promise<Collection> {
  const db = await connectToDatabase();
  return db.collection("articles");
}

export async function getAllArticles(limit = 0): Promise<APIArticle[]> {
  const collection = await getCollection();
  return await collection
    .find<APIArticle>({})
    .sort({ timeStamp: -1 })
    .limit(limit)
    .toArray();
}
export async function getArticlesByUser(
  limit: number,
  userId: string,
): Promise<APIArticle[]> {
  const collection = await getCollection();
  return await collection
    .find<APIArticle>({ userId: userId })
    .sort({ timeStamp: -1 })
    .limit(limit)
    .toArray();
}
export async function getArticlesByArticlesIds(
  limit: number,
  articleIds: string[],
): Promise<APIArticle[]> {
  const collection = await getCollection();
  return await collection
    .find<APIArticle>({ articleId: { $in: articleIds } })
    .sort({ timeStamp: -1 })
    .limit(limit)
    .toArray();
}

export async function addArticleToDatabase(
  createArticle: APIArticle,
): Promise<APIArticle | null> {
  const collection = await getCollection();
  const articleInsertedStatus = await collection.insertOne(createArticle);
  return await collection.findOne<APIArticle>({
    _id: articleInsertedStatus.insertedId,
  });
}

export async function deleteArticle(articleId: string) {
  const collection = await getCollection();
  return await collection.deleteOne({ articleId: articleId });
}

export async function updateArticle(
  articleId: string,
  title: string,
  text: string,
) {
  const collection = await getCollection();
  return await collection.updateOne(
    { articleId: articleId },
    { $set: { title: title, text: text } },
  );
}
