/* eslint-disable import/no-anonymous-default-export */
import { NowRequest, NowResponse } from "@vercel/node";
import { connectToDatabase } from '../../lib/database';

export default async (req: NowRequest, res: NowResponse) => {
    
    if (req.method === "GET") {
        const db = await connectToDatabase();
        const collection = await db.collection("recipes");

        // Request query exists
        if (req.query != {}) {

            if(req.query.name && req.query.name != "") {
                const { name } = req.query ;
            
                const recipes = await collection.find({ recipe_name: name }).toArray();
                res.status(200).json({ recipes: recipes });

            } else {
                // No query so return all
                const recipes = await collection.find({}).toArray();
                res.status(200).json({ recipes: recipes });
            }
        
        }
                
    } else if (req.method === "POST") {
        const newrecipe = req.body;
        const db = await connectToDatabase();
        const collection = await db.collection("recipes");
        const recipes = await collection.insertOne(newrecipe);
        res.status(200).json({ recipes });
    }
    else {
        res.status(404).json({ status: "ERROR ROUTE NOT FOUND" });
    }

};

