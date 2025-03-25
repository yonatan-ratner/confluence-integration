export default function getPage(): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confluence Integration</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: #f5f6fa;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
        }
        h1 {
          color: #333;
          margin-bottom: 40px;
        }
        .btn {
          padding: 12px 24px;
          background-color: #0052cc;
          color: white;
          border: none;
          border-radius: 6px;
          text-decoration: none;
          font-size: 16px;
          cursor: pointer;
        }
        .btn:hover {
          background-color: #0065ff;
        }
      </style>
    </head>
    <body>
      <h1>Yonatans Confluence Integration</h1>
      <a href="/spaces" class="btn">Get Spaces</a>
    </body>
    </html>
  `;
}
