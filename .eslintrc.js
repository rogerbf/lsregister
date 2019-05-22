module.exports = {
    "env": {
        "node": true,
        "es6": true
    },
    "settings": {
        "polyfills": [
        ]
    },
    "extends": ["eslint:recommended"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "overrides": [
        {
            "files": ["src/bin/cli.js", "sample.js"],
            "rules": {
                "no-console": "off"
            }
        }
    ],
    "rules": {
    }
};
