import type { ObjectId } from 'mongodb'

export interface ArticleTag {
   _id?: ObjectId | undefined
   title: string
}
