module.exports = {
    entry: "./app.js",
    output: {
        path: __dirname + '/dist',
        filename: "bundle.js"
    },
    resolveLoader: {
        root: __dirname + '/node_modules'
    },
    module: {
        loaders: [
            { test: /\.html$/, loader: "raw"},
            { test: /\.scss$/, loader: "style!css!sass"}
        ]
    }
};
