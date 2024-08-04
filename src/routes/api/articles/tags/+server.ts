import { json } from '@sveltejs/kit';
import db from '$db/mongo';

import { ObjectId } from 'mongodb';
import type { ArticleTag } from '$db/models/ArticleTag';

const TagCollection = db.collection('tags');

export async function GET({ url }) {
	try {
		const data = await TagCollection.find().toArray();

		return json(data, { status: 201 });
	} catch (error: any | unknown) {
		return json({}, { status: 500 });
	}
}

export async function POST({ request }) {
	try {
		const data = await request.json();
		let newTag: ArticleTag = {
			title: data.title,
		};
		const dbResponse = await TagCollection.insertOne(newTag);
		return json({ dbResponse }, { status: 201 });
	} catch (error: any | unknown) {
		return json({}, { status: 500 });
	}
}

export async function PUT({ request }) {
	try {
		const data = await request.json();

		return json({}, { status: 201 });
	} catch (error: any | unknown) {
		return json({}, { status: 500 });
	}
}

export async function PATCH({ request }) {
	try {
		const data = await request.json();
		return json({}, { status: 201 });
	} catch (error: any | unknown) {
		return json({}, { status: 500 });
	}
}

export async function DELETE({ request }) {
	try {
		const data = await request.json();
		// delete tag at _id
		const dbResponse = await TagCollection.deleteOne({
			_id: ObjectId.createFromHexString(data._id),
		});
		return json(dbResponse, { status: 201 });
	} catch (error: any | unknown) {
		return json({}, { status: 500 });
	}
}
