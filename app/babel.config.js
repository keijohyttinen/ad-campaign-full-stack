module.exports = function (api) {
    api.cache(true)
    const presets = [
        "module:metro-react-native-babel-preset"
    ];
    const plugins = [
        "relay",
        "@babel/plugin-transform-flow-strip-types",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-regenerator",
        "@babel/plugin-transform-async-to-generator",
        "@babel/plugin-transform-runtime"
    ];

    return {
        presets,
        plugins,
        'sourceMaps': true,
    };
}