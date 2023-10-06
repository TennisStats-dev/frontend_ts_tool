module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "standard-with-typescript"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": "./tsconfig.json"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "@typescript-eslint/indent": "error",
        "@typescript-eslint/indent": "off",
        "no-tabs": 0,
        "comma-dangle": "off",
        "@typescript-eslint/comma-dangle": "off"
    }
}
