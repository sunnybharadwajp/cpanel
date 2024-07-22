import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {

    let response = await fetch(`/data/articles/api?slug=${params.slug}`);
    let payload = await response.json();


    return {
        article: payload.body
    }
}