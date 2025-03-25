# 🚀 Yonatan's Confluence Integration

A proof-of-concept Node.js integration with Atlassian Confluence using OAuth 2.0 (3LO), built in TypeScript.

---

## 📚 Features

| Feature                               | Status |
|--------------------------------------|--------|
| OAuth 2.0 Authorization Code Flow    | ✅     |
| List all pages in a Confluence space | ✅     |
| View content of a specific page      | ✅     |
| Session-based token management       | ✅     |
| RESTful Express.js routes            | ✅     |
| Styled HTML rendering                | ✅     |
| Automated testing with Mocha/Chai    | 🟡 (WIP) |

---

## 🏗️ Project Structure

```
src/
├── models/         # TypeScript interfaces
├── routes/         # Express route handlers
├── services/       # Business logic + API calls
├── utils/          # Utility functions
├── app.ts          # Server entry point
test/
├── api/            # Test for external integration
├── services/       # Sample unit tests
```

---

## 🔧 Setup Instructions

### 1. Clone & Install
```
git clone https://github.com/yonatan-ratner/confluence-integration.git
cd confluence-integration
npm install
```

### 2. Set Environment Variables
Create an `.env` file:
```env
ATLASSIAN_CLIENT_ID=your-client-id
ATLASSIAN_CLIENT_SECRET=your-client-secret
ATLASSIAN_REDIRECT_URL=your-callback-url
SESSION_SECRET=your-session-secret 
```
</br>
- note that `SESSION_SECRET` is a unique string I used to identify the backend that uses `express-session`

### 3. Build & Run
```
npm run build
npm run start
```

### 4. Debug
requires an existing build so first run
```
npm run build
```

then setup ```./vscode/launch.json``` like so:
```
{
    "version": "0.2.0",
    "configurations": [

        {
            "type": "node",
            "request": "launch",
            "name": "Debug Typescript",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}\src\app.ts",
            "runtimeArgs": [ "-r", "ts-node/register", "-r", "tsconfig-paths/register" ],
            "console": "integratedTerminal",
            "outFiles": [
                "${workspaceFolder}/**/*.js"
            ]
        }
    ]
}
```
Then you can click `F5` to debug, or initiate it manually from the menu.

---

## 🧪 Testing

- Built-in test structure using **Mocha** and **Chai**
- Example tests under `test/services/pageService.test.ts`

### Run Tests:
```
npm run test
```

_(Note: Tests are work in progress)_

---

## 📸 Developer App Configuration

> _Embed your `developer.atlassian.com` OAuth2 App configuration screenshot here._

---

## 🧠 AI Usage

This project includes the following AI-assisted contributions:

- **Utility generation** (e.g. `jsonToQuery`)
- **HTML rendering for routes** (`/spaces`, `/pages`, etc.)
- **Parsing logs and tracing issues**
- **Summarizing Atlassian documentation**
- **This Readme 😄**

---

## 🧰 Tech Stack & Dependencies

This project uses a focused Node.js + TypeScript stack, supported by the following packages:

### 🔧 Runtime Dependencies

| Package              | Purpose                                                                 |
|----------------------|-------------------------------------------------------------------------|
| `express`            | Core web framework for routing and middleware                           |
| `express-session`    | Session middleware used for temporary in-memory token storage           |
| `dotenv`             | Loads environment variables from `.env` into `process.env`              |

---

### 🧪 Dev & Debug Dependencies

| Package                  | Purpose                                                                 |
|--------------------------|--------------------------------------------------------------------------|
| `typescript`             | Type-safe JavaScript development                                        |
| `ts-node`                | Enables running TypeScript directly (used in debugging setup)           |
| `tsconfig-paths`         | Supports path aliasing in debugging scenarios                           |
| `@types/express`         | Type definitions for Express                                            |
| `@types/express-session` | Type definitions for express-session                                    |

---

### 🧼 Linting

| Package              | Purpose                                                                 |
|----------------------|-------------------------------------------------------------------------|
| `eslint`             | Linting to enforce style and prevent bugs                               |
| `@eslint/js`         | ESLint default JavaScript rules                                         |
| `globals`            | Defines environment globals (Node.js, browser)                          |
| `typescript-eslint`  | Adds TypeScript support to ESLint                                       |

---

## ⚠️ Limitations & Concessions

This project is a **Proof-of-Concept (PoC)** focused on OAuth2 integration and core functionality. To keep the scope tight, the following trade-offs were made:

- 🔐 **No token refresh logic**  
  Access tokens are short-lived. The refresh token flow is not implemented but can be added easily if needed.

- 🧪 **Limited testing coverage**  
  While test structure using Mocha/Chai is set up, only basic unit tests are in place. Coverage for services, route handlers, and error states is still needed.

- 📦 **Package vulnerabilities**  
  As of the last install, `express-session` and `express` have known vulnerabilities (3 low, 4 high). These are acceptable for a PoC, but should be audited and patched in production.

- 🔧 **Magic strings & tight coupling**  
  Strings like OAuth scopes, endpoint paths, and HTML templates are hardcoded. These should ideally be extracted into constants/config files for maintainability and testability.

- 🧭 **Router paths defined inline**  
  Routes are registered inline (`app.use('/')`) which works for small apps but may cause confusion at scale. Grouping or versioning route prefixes can help structure larger APIs.

- 🛠 **No view engine**  
  HTML pages are built via string templates. While visually clean, this approach limits maintainability. Using a templating engine (e.g., EJS or Pug) would scale better for UI rendering.

- 🧠 **No logging or error monitoring**  
  Errors are logged to the console only. A proper logging system (like `winston`) or monitoring tool would be needed for production-readiness.

- 🧰 **No persistent storage**  
  Session data and tokens are held in memory, which resets on server restart. In production, a store like Redis would be essential.

---

## 🗂️ Sources & References

- [Atlassian OAuth 2.0 Docs](https://developer.atlassian.com/cloud/confluence/oauth-2-3lo-apps/)
- [Node.js + TypeScript Scaffolding](https://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript)
