/**
 * Service for handling Confluence page-related API calls.
 * Fetches pages within a space and individual page details.
 */

import {
  PageData,
  PagesResponse,
} from "../interfaces/vendors/atlassian/IPages";

/**
 * Fetches the list of pages within a specific Confluence space.
 * @param accessToken - The access token for authentication.
 * @param cloudId - The cloud ID of the Confluence instance.
 * @param spaceId - The ID of the space to fetch pages from.
 * @returns The response containing the list of pages.
 * @throws An error if the fetch fails.
 */
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

/**
 * Fetches the details of a specific Confluence page by its ID.
 * @param accessToken - The access token for authentication.
 * @param cloudId - The cloud ID of the Confluence instance.
 * @param pageId - The ID of the page to fetch.
 * @returns The data of the requested page.
 * @throws An error if the fetch fails.
 */
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
