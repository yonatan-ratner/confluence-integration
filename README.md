# 🚀 Confluence & OAuth2.0 Integration

A proof-of-concept Node.js integration with Atlassian Confluence using OAuth 2.0 (3LO), built in TypeScript.

---

## 📚 Features

| Feature                              | Status |
| ------------------------------------ | ------ |
| OAuth 2.0 Authorization Code Flow    | ✅     |
| List all pages in a Confluence space | ✅     |
| View content of a specific page      | ✅     |
| Session-based token management       | ✅     |
| RESTful Express.js routes            | ✅     |
| Styled HTML rendering                | ✅     |
| Automated testing with Mocha/Chai    | ✅     |

---

## 🏗️ Project Structure

```
src/
├── controllers/        # HTML view rendering templates
├── models/             # TypeScript interfaces and session augmentation
├── routes/             # Express route handlers (auth, pages, spaces)
├── services/           # Business logic and Confluence API calls
├── templates/          # HTML templates as TS strings
├── utils/              # Utility functions (query builder, etc.)
├── index.ts            # Server entry point

test/
├── integration/        # Build/startup/lint tests
├── services/           # AuthService unit tests
├── utils/              # Utility function tests
├── index.ts            # Global test bootstrap (type loading)

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

> **Note**: `SESSION_SECRET` is used by `express-session` for token storage, it can be whatever you want as long as it will be unique.

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

then setup `./vscode/launch.json` like so:

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

### 🧩 Covered Areas

| Test Type       | Status | Description                                                             |
| --------------- | ------ | ----------------------------------------------------------------------- |
| ✅ Unit Tests   | ✅     | Tests for utilities and internal logic (e.g., AuthService, jsonToQuery) |
| ✅ Lint + Build | ✅     | Tests ensure `npm run lint` and `npm run build` succeed                 |
| ✅ Startup Test | ✅     | Verifies that `npm run start` compiles and responds on the `/` route    |
| 🚧 Integration  | 🟡     | Partial testing of service logic and session extensions                 |
| ❌ Full E2E     | ❌     | Skipped due to OAuth2 3LO browser-based flow                            |

### 🔎 Running Tests

```
npm test
```

This runs all tests, which include:

- Linting checks
- Build compilation test
- Startup test (auto-builds if needed)
- All unit & service-level tests

---

## 📸 Developer App Configuration

![image](https://github.com/user-attachments/assets/d96944a1-4a65-4c36-beed-bb0f5dda02a5)
![image](https://github.com/user-attachments/assets/3caf90b2-fb59-4c9d-bdcf-124c8bbc4525)

---

## 🧠 AI Usage

This project includes the following AI-assisted contributions:

- **Documentation generation**
- **Test generation**
- **HTML rendering for routes** (`/spaces`, `/pages`, etc.)
- **Parsing logs and tracing issues**
- **Summarizing Atlassian documentation**
- **This Readme 😄**

---

## 🧰 Tech Stack & Dependencies

### 🔧 Runtime Dependencies

| Package         | Purpose                            |
| --------------- | ---------------------------------- |
| express         | Core web framework                 |
| express-session | In-memory session/token management |
| dotenv          | Load environment variables         |

### 🧪 Dev & Debug Dependencies

| Package                | Purpose                             |
| ---------------------- | ----------------------------------- |
| typescript             | Type-safe JavaScript development    |
| ts-node                | Run TypeScript directly             |
| tsconfig-paths         | Supports path aliasing in debugging |
| @types/express         | Type definitions for Express        |
| @types/express-session | Types for express-session           |
| mocha / chai           | Test runner and assertions          |
| cross-env              | Cross-platform env variable support |

### 🧼 Linting

| Package           | Purpose                         |
| ----------------- | ------------------------------- |
| eslint            | Code quality and style          |
| @eslint/js        | ESLint base rules               |
| globals           | Node/browser global definitions |
| typescript-eslint | TypeScript plugin for ESLint    |

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
