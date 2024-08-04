import type { ArticleTag } from '$db/models/ArticleTag';
import { writable } from 'svelte/store';

export const articleTagStore = writable<ArticleTag[]>([]);

export const setArticleTags = (tags: ArticleTag[]) => {
	articleTagStore.set(tags);
};

export const refreshArticleTags = async () => {
  const getArticleTags = await fetch('/api/articles/tags');
  const tags = await getArticleTags.json();
  setArticleTags(tags);
}