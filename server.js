var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var options = require('minimist')(process.argv.slice(2));
var publicPath = "http://localhost:" + +config.devServer.port;

function removeOptimizationPlugins() {
    const toRemove = [];
    config.plugins.forEach(plugin => {
        if (plugin instanceof webpack.optimize.UglifyJsPlugin)
            toRemove.push(plugin);
        if (plugin instanceof webpack.optimize.DedupePlugin)
            toRemove.push(plugin);
    });
    toRemove.forEach(plugin => {
        const index = config.plugins.indexOf(plugin);
        config.plugins.splice(index, 1);
    });
}

// attempt to hot-swap modules
if (options.hot) {
    removeOptimizationPlugins();
    // configure entry points
    config.entry.app.unshift("webpack-dev-server/client?" + publicPath);
    // add the HMR plugin
    config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
    // fall back to reloading the whole page if the module can't be hot-swapped
    config.devServer.inline = true;
    config.devtool = 'eval-source-map';
}

new WebpackDevServer(webpack(config), config.devServer)
    .listen(config.devServer.port, 'localhost', function(err) {
        if (err) {
            console.log(err);
        }
        console.log("Listening at: " + publicPath);
    });
