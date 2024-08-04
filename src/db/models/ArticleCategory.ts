import type { ObjectId } from 'mongodb'

export interface ArticleCategory {
   _id?: ObjectId | undefined
   title: string
}
