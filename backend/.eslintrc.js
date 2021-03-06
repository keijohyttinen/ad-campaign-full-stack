module.exports = {
    "extends": "airbnb",
    "rules": {
        "import/no-extraneous-dependencies": ["error", { "devDependencies": true }]
    },
    "root": true,
    "env": {
        "mocha": true
    },
    "overrides": [
        {
            files: "*.test.js",
            rules: {
                "no-unused-expressions": "off"
            }
        }
    ]
};