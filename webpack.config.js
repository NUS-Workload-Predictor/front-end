module.exports = {
    entry: './index.js',
    output: {
        path: './dist',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
        {
            test: /\.jsx?$/,
            loader: 'babel',
            exclude: [/node_modules/]
        },
        {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass']
        }
      ]
    }
}
