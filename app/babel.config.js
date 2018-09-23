module.exports = function (api) {
    api.cache(true)
    const presets = [
        "@babel/preset-env",
        "@babel/preset-react",
        "module:metro-react-native-babel-preset"
    ];
    const plugins = [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-regenerator",
        "@babel/plugin-transform-async-to-generator",
        "@babel/plugin-transform-runtime",
        "relay"
    ];

    return {
        presets,
        plugins
    };
}