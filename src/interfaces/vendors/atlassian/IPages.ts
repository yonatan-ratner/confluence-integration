/* eslint-disable @typescript-eslint/no-explicit-any */
// disable no explicit any due to how Atlassian structures this reply

export interface PagesResponse {
  results: PageData[];
  _links: {
    next: string;
    base: string;
  };
}

export interface PageData {
  id: string;
  status: string;
  title: string;
  spaceId: string;
  parentId: string;
  parentType: string;
  position: number;
  authorId: string;
  ownerId: string;
  lastOwnerId: string;
  createdAt: string;
  version: {
    createdAt: string;
    message: string;
    number: number;
    minorEdit: boolean;
    authorId: string;
  };
  body: {
    storage?: Record<string, any>;
    atlas_doc_format?: Record<string, any>;
    view?: Record<string, any>;
  };
  labels?: {
    results: {
      id: string;
      name: string;
      prefix: string;
    }[];
    meta: {
      hasMore: boolean;
      cursor: string;
    };
    _links: {
      self: string;
    };
  };
  properties?: {
    results: {
      id: string;
      key: string;
      version: Record<string, any>;
    }[];
    meta: {
      hasMore: boolean;
      cursor: string;
    };
    _links: {
      self: string;
    };
  };
  operations?: {
    results: {
      operation: string;
      targetType: string;
    }[];
    meta: {
      hasMore: boolean;
      cursor: string;
    };
    _links: {
      self: string;
    };
  };
  likes?: {
    results: {
      accountId: string;
    }[];
    meta: {
      hasMore: boolean;
      cursor: string;
    };
    _links: {
      self: string;
    };
  };
  versions?: {
    results: {
      createdAt: string;
      message: string;
      number: number;
      minorEdit: boolean;
      authorId: string;
    }[];
    meta: {
      hasMore: boolean;
      cursor: string;
    };
    _links: {
      self: string;
    };
  };
  isFavoritedByCurrentUser?: boolean;
  _links: {
    base?: string;
    webui?: string;
    editui?: string;
    tinyui?: string;
    self?: string;
  };
}
