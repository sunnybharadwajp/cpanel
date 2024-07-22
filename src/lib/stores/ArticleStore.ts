import { writable } from 'svelte/store';
import type {ArticleInterface} from "$db/models/Article";


const articleStore = writable<ArticleInterface[]>([]);

const setArticles = (articles:ArticleInterface[] ) => {
    articleStore.set(articles);
}

const addArticle = (article: ArticleInterface) => {
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