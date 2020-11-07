/* eslint-disable import/no-anonymous-default-export */
import { NowRequest, NowResponse } from "@vercel/node";
import { connectToDatabase } from '../../lib/database';

export default async (req: NowRequest, res: NowResponse) => {

  if (req.method === "GET") {
    const db = await connectToDatabase();
    const collection = await db.collection("recipes");
    const recipes = await collection.find({}).toArray();

    const { id } = req.query;

    res.status(200).json({ recipes: recipes[Number(id)] });
  } else {
    res.status(404).json({ status: "ERROR ROUTE NOT FOUND" });
  }
};