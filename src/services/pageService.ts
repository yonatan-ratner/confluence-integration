import { PagesResponse } from "../models/IPages";

export async function getAllPages(accessToken: string, cloudId: string): Promise<PagesResponse> {
  const confluencePagesAPIUrl: string = "https://yonaratner1/wiki/api/v2/pages"

  try {
    const response: Response = await fetch(confluencePagesAPIUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to fetch pages: ${response.status} ${error}`);
    }

    const pagesData: PagesResponse = await response.json()
    return pagesData
  }
  catch (err: any) {
    console.error("getAllPages error:", err.message);
    throw err;
  }
}


/*
const fetch = require('node-fetch');

fetch('https://{your-domain}/wiki/api/v2/pages', {
  method: 'GET',
  headers: {
    'Authorization': `Basic ${Buffer.from(
      'email@example.com:<api_token>'
    ).toString('base64')}`,
    'Accept': 'application/json'
  }
})
  .then(response => {
    console.log(
      `Response: ${response.status} ${response.statusText}`
    );
    return response.text();
  })
  .then(text => console.log(text))
  .catch(err => console.error(err));
*/