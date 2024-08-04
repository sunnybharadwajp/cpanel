import { Article, type ArticleInterface } from '$db/models/Article'
import type { ObjectId } from 'mongodb'
export enum ProjectCategory {
   Application = 'Application',
   Design = 'Design',
   Paper = 'Paper',
   Misc = 'Misc'
}
export enum ProjectState {
   Draft = 'Draft',
   Finished = 'Finished',
   Archived = 'Archived'
}

export class Project implements ProjectInterface {
   slug: string
   title: string
   summary: string
   category: ProjectCategory
   coverImageUrl: string
   state = ProjectState.Draft
   datetime: {
      createdAt: Date
      updatedAt: Date
      publishedAt: Date | string
   }
   article: ArticleInterface
   related: {
      articles: ArticleInterface[]
   }

   constructor({
      slug = '',
      title = 'Untitled Project',
      summary = '',
      category = ProjectCategory.Misc,
      coverImageUrl = '',
      state = ProjectState.Draft,
      article = new Article(),
      related = {
         articles: []
      },
      datetime = {
         createdAt: new Date(),
         updatedAt: new Date(),
         publishedAt: ''
      }
   } = {}) {
      this.slug = slug
      this.title = title
      this.summary = summary
      this.category = category
      this.coverImageUrl = coverImageUrl
      this.state = state
      this.article = article
      this.related = related
      this.datetime = datetime
   }
}

export interface ProjectInterface {
   _id?: ObjectId | string
   slug: string
   title: string
   summary: string
   category: ProjectCategory
   coverImageUrl: string
   state: ProjectState
   datetime: {
      createdAt: Date
      updatedAt: Date
      publishedAt: Date | string
   }
   article: ArticleInterface
   related: {
      articles: ArticleInterface[]
   }
}

export interface ProjectRequest {
   slug: string
   title: string
   summary: string
   category: ProjectCategory
   coverImageUrl: string
   state: ProjectState
   datetime: {
      createdAt: Date
      updatedAt: Date
      publishedAt: Date | string
   }
   article: ArticleInterface
   related: {
      articles: ArticleInterface[]
   }
}
