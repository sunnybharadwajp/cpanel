import type {ObjectId} from "mongodb";

enum FileType {Document, Image, Other }
export enum ArticleCategory {Project = 'Project', Blogpost='Blogpost', Paper='Paper', Study='Study', Thought='Thought', Misc='Misc'}
export enum ArticleState {Draft='Draft',Finished='Finished',Archived='Archived' }

export class Article implements ArticleInterface {

    slug: string;
    title: string;
    summary: string;
    category: ArticleCategory;
    tags: ArticleTag[];
    state: ArticleState;
    content: string;
    highlighted: boolean;
    published:boolean;
    float: number;
    coverImageUrl: string;
    related: {
        articles: ArticleInterface[];
        files: File[];
        images: File[];
        links: Link[];
    };
    datetime: {
        createdAt: Date;
        updatedAt: Date;
        publishedAt: Date | string;
    };

    constructor({
        slug = '',
        title = 'Untitled Article',
        summary = '',
        category = ArticleCategory.Misc,
        tags = [],
        state = ArticleState.Draft,
        content = '',
        highlighted = false,
        published = false,
        float = 0,
        coverImageUrl = '',
        related = {
            articles: [],
            files: [],
            images: [],
            links: []
        },
        datetime = {
            createdAt: new Date(),
            updatedAt: new Date(),
            publishedAt: ''
        }
    } = {}) {
        this.slug = slug;
        this.title = title;
        this.summary = summary;
        this.category = category;
        this.tags = tags;
        this.state = state;
        this.content = content;
        this.highlighted = highlighted;
        this.published = published;
        this.float = float;
        this.coverImageUrl = coverImageUrl;
        this.related = {
            articles: related.articles,
            files: related.files,
            images: related.images,
            links: related.links
        };
        this.datetime = {
            createdAt: datetime.createdAt,
            updatedAt: datetime.updatedAt,
            publishedAt: datetime.publishedAt
        };
    }
}

export interface ArticleInterface {
    _id?: ObjectId | string;
    slug: string;
    title: string;
    summary: string;
    category: ArticleCategory;
    tags: ArticleTag[];
    state: ArticleState;
    content: string;
    highlighted: boolean;
    published:boolean;
    float: number;
    coverImageUrl: string;
    related: {
        articles: ArticleInterface[];
        files: File[];
        images: File[];
        links: Link[];
    }
    datetime: {
        createdAt:Date;
        updatedAt:Date;
        publishedAt: Date | string;
    };
}

export interface File {
    _id?: ObjectId | string;
    title: string;
    type: FileType;
    description: string;
    url: string;
}

export interface Link {
    _id?: ObjectId | string;
    title: string;
    url: string;
    comment: string;
}

export interface ArticleTag {
    _id?: ObjectId | string;
    title: string;
}

export interface ArticleRequest {
    slug: string;
    title: string;
    summary: string;
    category: ArticleCategory;
    tags: ArticleTag[];
    state: ArticleState;
    content: string;
    highlighted: boolean;
    published:boolean;
    float: number;
    coverImageUrl: string;
    related: {
        articles: ArticleInterface[];
        files: File[];
        images: File[];
        links: Link[];
    }
    datetime: {
        createdAt:Date;
        updatedAt:Date;
        publishedAt: Date | string;
    };
}