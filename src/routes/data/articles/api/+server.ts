import {json} from "@sveltejs/kit";

import {ObjectId} from "mongodb";
import db from "$db/mongo";
import type { ArticleRequest } from '$db/models/Article';

const ArticleCollection = db.collection('articles');

export async function GET({ url }) {
    let articles = await ArticleCollection
        .find({})
        .sort({"createdAt": -1})
        .toArray();

    return json({
        status:200,
        body: { articles }
    });
}

export async function POST({ request }) {
    const payload: ArticleRequest = await request.json();
    let dbResponse = await ArticleCollection.insertOne(payload);
    return json({
        status:200,
        body: {
            message: "got it!",
            record: payload,
            response: dbResponse
        }
    });
}

export async function DELETE({ url }) {
    // const { id } = await request.json();
    const id = url.searchParams.get('id');
    if (id) {
        const objId = new ObjectId(id);
        try {
            await ArticleCollection.deleteOne({_id: new ObjectId(id)});
            // console.log("deleted");
            return json({
                status: 200,
                body: {
                    message: "article deleted"
                }
            });
        } catch(e) {
            console.log(e);
            return new Response("Error");
        }
    }
}