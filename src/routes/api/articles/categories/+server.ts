import { json } from '@sveltejs/kit';
import db from '$db/mongo';

import { ObjectId } from 'mongodb';
import type { ArticleCategory } from '$db/models/ArticleCategory';

const CategoryCollection = db.collection('categories');

export async function GET({ url }) {
	try {
		const data = await CategoryCollection.find().toArray();

		return json(data, { status: 201 });
	} catch (error: any | unknown) {
		return json({}, { status: 500 });
	}
}

export async function POST({ request }) {
	try {
		const data = await request.json();
		let newCategory: ArticleCategory = {
			title: data.title,
		};
		const dbResponse = await CategoryCollection.insertOne(newCategory);
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
		// delete category at _id
		const dbResponse = await CategoryCollection.deleteOne({
			_id: ObjectId.createFromHexString(data._id),
		});
		return json(dbResponse, { status: 201 });
	} catch (error: any | unknown) {
		return json({}, { status: 500 });
	}
}
