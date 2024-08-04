import { json } from '@sveltejs/kit';

import db from '$db/mongo';
import { ArticleState, type ArticleRequest } from '$db/models/Article';

const ArticleCollection = db.collection('articles');

export async function GET({ params }) {
	const search_string = params.search_string;
	let articles = await ArticleCollection.find({
		title: { $regex: search_string, $options: 'i' },
	})
		.sort({ createdAt: -1 })
		.toArray();

	return json({
		status: 200,
		message: `Found ${articles.length} articles`,
		data: articles,
	});
}
