import type {ObjectId} from "mongodb";

export interface Article {
    _id?: ObjectId | string;
    title: string;
    content: string;
    type: string;
    imageUrl?: string;
}

export interface ArticleRequest {
    title: string;
    content: string;
    type: string;
    imageUrl?: string;
}
