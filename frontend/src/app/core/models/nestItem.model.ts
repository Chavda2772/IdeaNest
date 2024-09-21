// Used for Single Nest Item
export interface NestItem {
    id: Number,
    Title: string,
    Description: string,
    IsPreview: boolean,
    Url: string,
    UrlTitle: string,
    UrlImage: string,
    UrlDescription: string,
    UrlDomain: string,
}

// Used For Single Collection Items
export interface CollectionDetails {
    CollectionId: Number,
    CollectionName: String
}

// Used for Collection Response
export interface CollectionResponse {
    success: boolean;
    msg?: String;
    token?: string;
    Collection: CollectionDetails[],
    Items: NestItem[],
}