import { PagesResponse } from "../models/IPages";

export default function getPage(pages: PagesResponse,spaceId: string) : string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pages</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f5f6fa;
            padding: 40px;
            text-align: center;
          }
          .page {
            background: white;
            border-radius: 10px;
            padding: 20px;
            margin: 20px auto;
            max-width: 600px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }
          .btn {
            margin-top: 10px;
            padding: 10px 20px;
            background-color: #0052cc;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            text-decoration: none;
          }
          .btn:hover {
            background-color: #0065ff;
          }
          .back {
            display: inline-block;
            margin-bottom: 30px;
            color: #0052cc;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <a class="back" href="/spaces">⬅ Back to Spaces</a>
        <h1>Pages in Space: ${spaceId}</h1>
        ${pages.results.map(page => `
          <div class="page">
            <h3>${page.title}</h3>
            <a class="btn" href="/${spaceId}/pages/${page.id}">View Page Content</a>
          </div>
        `).join('')}
      </body>
      </html>
    `
}