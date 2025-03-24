//
export interface PagesResponse {
    results: PageData[],
    _links: {
        next: string,
        base: string
    }
}

export interface PageData {
    id: string,
    status: string,
    title: string,
    spaceId: string,
    parentId: string,
    parentType: string,
    position: number,
    authorId: string,
    ownerId: string,
    lastOwnerId: string,
    createdAt: string,
    version: {
        createdAt: string,
        message: string,
        number: number,
        minorEdit: true,
        authorId: string
    },
    body: {
        storage: {},
        atlas_doc_format: {}
    },
    _links: {
        webui: string,
        editui: string,
        tinyui: string
    }
}