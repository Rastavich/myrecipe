/* eslint-disable import/no-anonymous-default-export */
import { NowRequest, NowResponse } from "@vercel/node";
import { connectToDatabase } from '../../lib/database';

export default async (req: NowRequest, res: NowResponse) => {
    
    const { name } = req.query;
    const db = await connectToDatabase();
    const collection = await db.collection("recipes");
    const recipes = await collection.deleteOne( {recipe_name: name});
    res.status(200).json({ recipes });

};