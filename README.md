# confluence-integration

## Procedure
### build + run
``` npm run build ``` - Compiles TS to JS and outputs to ./dist/ directory
``` npm run start ``` - Run node server from generated JS files

### Debug

``` npm instal --save-dev ts-node tsconfig-paths ```

2. my .vscode/launch.json
```
{
    "configurations": [

        {
            "type": "node",
            "request": "launch",
            "name": "Debug Typescript",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}\\src\\app.ts",
            "runtimeArgs": [ "-r", "ts-node/register", "-r", "tsconfig-paths/register" ],
            "console": "integratedTerminal",
            "outFiles": [
                "${workspaceFolder}/**/*.js"
            ]
        }
    ]
}
```

## Structure

## OAuth

### Scopes
![image](https://github.com/user-attachments/assets/cbf3cf8f-157e-48f1-8a07-3a2f974f11e7)

## Constrains & Concessions

This project is a PoC, as such I allow myself some bad practices and vulnerabilties.

1. express.js has **7** vulnerabilites (*3 low*, **4 high**)

## Sources

### Node.js project scaffolding
``` https://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript ```
