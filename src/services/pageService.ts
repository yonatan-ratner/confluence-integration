import { PageData, PagesResponse } from "../interfaces/vendors/IPages";

//TODO: remove?
export async function getAllPages(
  accessToken: string,
  cloudId: string
): Promise<PagesResponse> {
  const uri = `https://api.atlassian.com/ex/confluence/${cloudId}/wiki/api/v2/pages`;

  try {
    const response: Response = await fetch(uri, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to fetch pages: ${response.status} ${error}`);
    }

    const pagesData: PagesResponse = await response.json();
    return pagesData;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("OAuth error:", message);
    throw err;
  }
}

export async function getPagesInSpace(
  accessToken: string,
  cloudId: string,
  spaceId: string
): Promise<PagesResponse> {
  const uri = `https://api.atlassian.com/ex/confluence/${cloudId}/wiki/api/v2/spaces/${spaceId}/pages`;

  try {
    const response: Response = await fetch(uri, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to fetch pages: ${response.status} ${error}`);
    }

    const pagesData: PagesResponse = await response.json();
    return pagesData;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("OAuth error:", message);
    throw err;
  }
}

export async function getPageById(
  accessToken: string,
  cloudId: string,
  pageId: string
): Promise<PageData> {
  const uri = `https://api.atlassian.com/ex/confluence/${cloudId}/wiki/api/v2/pages/${pageId}?body-format=storage`;

  try {
    const response: Response = await fetch(uri, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to fetch pages: ${response.status} ${error}`);
    }

    const pagesData: PageData = await response.json();
    return pagesData;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("OAuth error:", message);
    throw err;
  }
}
