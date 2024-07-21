import { writable } from 'svelte/store';
import type {Article} from "$lib/types";


const articleStore = writable<Article[]>([]);

const setArticles = (articles:Article[] ) => {
    articleStore.set(articles);
}

const addArticle = (article: Article) => {
    articleStore.update(articles => [...articles, article])
}

const deleteArticle = (id: string) => {
    articleStore.update((articles) => {
        return articles.filter( article => article._id !== id )
    })
};

export {
    articleStore,
    setArticles,
    addArticle,
    deleteArticle,
}