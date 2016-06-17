var webpack = require('webpack');
var path = require('path');

module.exports = {
    debug: true,

    // more info: https://webpack.github.io/docs/build-performance.html#sourcemaps and
    //            https://webpack.github.io/docs/configuration.html#devtool
    devtool: 'source-map',

    devServer: {
        port: 3000,
        contentBase: "./dist",
        stats: "minimal"
    },

    // set to false to see a list of every file being bundled.
    noInfo: true,

    // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
    target: 'web',

    // Entry points for the app bundles
    entry: {
        // As an array so that we can unshift in the HMR plugin if we need to
        app: [
            './src/js/index.tsx'
        ]
        // Separate bundle for any production dependencies.
        // vendor: [
        //     'react',
        //     'react-dom',
        //     'tone',
        //     'alt',
        //     'aframe',
        //     'aframe-react',
        //     'aframe-altspace-component'
        // ]
    },

    output: {
        // Note: Physical files are only output by the production build task `npm run build`.
        path: path.join(__dirname, '/dist'),
        filename: 'js/[name].js'
    },

    plugins: [
        // Pulls commonly used modules into common chunks that are reused in other chunks
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     filename: 'js/vendor.js'
        // }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                include: [
                    path.join(__dirname, 'src'),
                    path.join(__dirname, 'test')
                ],
                loader: 'babel'
            },
            {
                test: /\.tsx?$/,
                include: [
                    path.join(__dirname, 'src'),
                    path.join(__dirname, 'test')
                ],
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.css$/,
                loader: "style!css?sourceMap!autoprefixer"
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: "file?name=img/[name]-[hash:6].[ext]"
            },
            {
                test: /\.(ogg|wav|mp3)$/,
                loader: "file?name=audio/[name]-[hash:6].[ext]"
            },
            {
                test: /\.(html|htm)$/,
                loader: "file?name=[name].[ext]"
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ],
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'source-map-loader'
            }
        ]
    },

    resolve: {
        extensions: ['', '.js', '.jsx', '.ts', '.tsx']
    },

    // profile: true,
};
