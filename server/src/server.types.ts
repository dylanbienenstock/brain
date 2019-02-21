export interface Subdocument {
    _id?: string;
}

export interface OfflineDocument {
    offlineId?: string;
}

export interface HasDocumentArray {
    updateSubdocument(path: string, _id: string, update: any): Promise<string>;
}

export interface Timestamps {
    createdAt?: number;
    updatedAt?: number;
}