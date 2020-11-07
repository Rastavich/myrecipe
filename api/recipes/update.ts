/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NowRequest, NowResponse } from "@vercel/node";
import { connectToDatabase } from '../../lib/database';

export default async (req: NowRequest, res: NowResponse) => {
    const db = await connectToDatabase();
    const collection = await db.collection("recipes");

    const recipeProperties = [ "category_name", "recipe_intro", "steps", "ingredients", "prep_time" ]
    
    // Request query exists
    if (req.query != {}) {

        //TODO: Check the query string for any of the recipeProperties and update the values if the
        if(req.query.name != "" && req.query.category_name != "") {
            const name  = req.query.name;
            const category_name = req.query.category_name;

            try {
                const recipes = await collection.updateOne(
                    { recipe_name : name },
                    { $set: { category_name : category_name } },
                    { upsert: true }
                );
                
                res.status(200).json({ recipes });

            } catch (e) {
                console.log(e);
            }
        }

        if(req.query.name != "" && req.query.category_name != "") {
            const name  = req.query.name;
            const category_name = req.query.category_name;

            try {
                const recipes = await collection.updateOne(
                    { recipe_name : name },
                    { $set: { category_name : category_name } },
                    { upsert: true }
                );
                
                res.status(200).json({ recipes });

            } catch (e) {
                console.log(e);
            }
        }
    }

};