/**
 * Service for handling Confluence space-related API calls.
 * Fetches all spaces accessible by the user.
 */

import { SpacesResponse } from "../interfaces/vendors/atlassian/ISpaces";

/**
 * Fetches all Confluence spaces accessible by the user.
 * @param accessToken - The access token for authentication.
 * @param cloudId - The cloud ID of the Confluence instance.
 * @returns The response containing the list of spaces.
 * @throws An error if the fetch fails.
 */
export async function getAllSpaces(
  accessToken: string,
  cloudId: string
): Promise<SpacesResponse> {
  const confluenceSpacesAPIUrl = `https://api.atlassian.com/ex/confluence/${cloudId}/wiki/api/v2/spaces`;

  try {
    const response: Response = await fetch(confluenceSpacesAPIUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to fetch spacess: ${response.status} ${error}`);
    }

    const spacesData: SpacesResponse = await response.json();
    return spacesData;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("OAuth error:", message);
    throw err;
  }
}
