// Used for Single Nest Item
export interface NestItem {
    id: number,
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
    CollectionId: number,
    CollectionName: String
}

// Used for Collection Response
export interface CollectionResponse {
    success: boolean;
    msg?: String;
    token?: string;
    CollectionName?: string,
    Collections: CollectionDetails[],
    Items: NestItem[],
}

export interface ItemResponseData {
    success: boolean;
    msg?: string;
    result: NestItem
}