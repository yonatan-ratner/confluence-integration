export interface SpacesResponse {
  results: SpacesData[];
  _links: {
    next: string;
    base: string;
  };
}

export interface SpacesData {
  id: string;
  key: string;
  name: string;
  type: string;
  statys: string;
  authorId: string;
  homepageId: string;
  description: {
    plain: object;
    view: object;
  };
  icon: {
    path: string;
    apiDownloadLink: string;
  };
  _links: {
    webui: string;
  };
}
