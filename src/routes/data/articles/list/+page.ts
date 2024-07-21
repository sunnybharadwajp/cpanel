import {setArticles} from "$lib/stores/ArticleStore";
// import {writable} from "svelte/store";

export async function load({ fetch }) {
    let response = await fetch('/data/articles/api');
    let payload = await response.json();
    let body = payload.body.articles;

    setArticles(body);
    return {
        articles: body
    }
}



