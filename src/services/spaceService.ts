import { SpacesResponse } from "../models/ISpaces";

export async function getAllSpaces(accessToken: string, cloudId: string): Promise<SpacesResponse> {
  const confluenceSpacesAPIUrl = `https://api.atlassian.com/ex/confluence/${cloudId}/wiki/api/v2/spaces`;

  try {
    const response: Response = await fetch(confluenceSpacesAPIUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to fetch spacess: ${response.status} ${error}`);
    }

    const spacesData: SpacesResponse = await response.json()
    return spacesData
  }
  catch (err: any) {
    console.error("getAllSpaces error:", err.message);
    throw err;
  }
}