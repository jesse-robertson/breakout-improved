//var path = require('path');

module.exports = {
    entry: "./public/js/app.js",
    output: {
        path: __dirname + "/public/js/",
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015']
            }
        }]
    }
    
    
    // resolve: {
    //     alias: {
    //         "pixi": path.join(__dirname, "lib/pixi.js"),
    //         "phaser": path.join(__dirname, "lib/phaser.js")
    //     }
    // },
    // module: {
    //     loaders: [{
    //         test: /phaser\.js$/,
    //         include: path.join(__dirname, 'lib'),
    //         loader: 'imports?PIXI=pixi'
    //     }]
    // }
    // module: {
    //     loaders: [{
    //         loader: 'script',
    //         test: /(pixi|phaser).js/
    //     }]   
    // }
};

// {

// }