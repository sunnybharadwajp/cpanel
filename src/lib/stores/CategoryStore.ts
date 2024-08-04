import type { ArticleCategory } from '$db/models/ArticleCategory'
import { writable } from 'svelte/store'

export const articleCategoryStore = writable<ArticleCategory[]>([])

export const setArticleCategories = (categories: ArticleCategory[]) => {
   articleCategoryStore.set(categories)
}

export const refreshArticleCategories = async () => {
   const getArticleCategories = await fetch('/api/articles/categories')
   const categories = await getArticleCategories.json()
   setArticleCategories(categories)
}
