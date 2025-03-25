export default function getPage(title: string,spaceId: string, body: string) : string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f5f6fa;
            padding: 40px;
            text-align: center;
          }
          h1 {
            color: #333;
          }
          .content {
            background: white;
            border-radius: 10px;
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            text-align: left;
            white-space: pre-wrap;
          }
          a.back {
            display: inline-block;
            margin-bottom: 30px;
            color: #0052cc;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <a class="back" href="/${spaceId}/pages">⬅ Back to Pages in this Space</a>
        <h1>${title}</h1>
        <div class="content">
          ${JSON.stringify(body, null, 2)}
        </div>
      </body>
      </html>
    `
}