import {json} from "@sveltejs/kit";

import {ObjectId} from "mongodb";
import db from "$db/mongo";
import type { ArticleRequest } from '$db/models/Article';

const ArticleCollection = db.collection('articles');

export async function GET({ url }) {
    const slug = url.searchParams.get('slug');
    if(!slug) {
        let articles = await ArticleCollection
            .find({})
            .sort({"createdAt": -1})
            .toArray();

        return json({
            status:200,
            body: { articles }
        });
    } else {
        let payload = await ArticleCollection
            .findOne({'slug': slug})


        return json({
            status:200,
            body: payload
        });
    }

}

export async function POST({ request }) {
    const payload: ArticleRequest = await request.json();
    // console.log(payload);
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
    const id = url.searchParams.get('id');
    if (id) {
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
    return json({

    });
}

export async function PUT({ url, request }) {
    const id = url.searchParams.get('id');
    if(id) {
        const payload: ArticleRequest = await request.json();
        try {
            console.log("here");
            let dbResponse = await ArticleCollection.updateOne({_id: new ObjectId(id)}, {$set: payload})

            return json({
                status: 200,
                body: {
                    message: "Updated the record",
                    response: dbResponse
                }
            });
        }
        catch(e) {
            console.log(e);
            return json({
                status: 500,
                body: {
                    message: "Could not update!",
                    error: e
                }
            });
        }
    }
    return json({
        status: 400,
        body: {
            message: "id not found"
        }
    });
}