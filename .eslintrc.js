const fs = require("fs");
const path = require("path");

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, ".prettierrc"), "utf8")
);

module.exports = {
    extends: [
        "react-app",
        "prettier",
        "prettier/react",
        "prettier/@typescript-eslint"
    ],
    plugins: ["prettier"],
    rules: {
        "@typescript-eslint/naming-convention": [
            "error",
            {
                selector: "class",
                format: ["PascalCase"]
            },
            {
                selector: "interface",
                format: ["PascalCase"]
            },
            {
                selector: "typeAlias",
                format: ["PascalCase"]
            },
            {
                selector: "typeParameter",
                format: ["PascalCase"]
            },
            {
                selector: "memberLike",
                modifiers: ["public"],
                format: ["camelCase", "PascalCase"],
                leadingUnderscore: "forbid"
            }
        ],
        "no-console": "error",
        "prettier/prettier": ["warn", prettierOptions]
    },
    overrides: [
        {
            files: ["**/*.ts?(x)"],
            rules: { "prettier/prettier": ["warn", prettierOptions] },
            parserOptions: {
                project: ["./tsconfig.json"] // Specify it only for TypeScript files
            }
        }
    ],
    parser: "@typescript-eslint/parser"
};
