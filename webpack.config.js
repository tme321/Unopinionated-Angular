var path = require('path');
var webpack = require('webpack');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

var AOT = false;
var isProd = false;



module.exports = {
    entry: { 
        polyfills: './src/demo/polyfills.ts',
        vendor: './src/demo/vendor.ts',
        uat: './src/lib/index.ts',
        app:'./src/demo/main.ts'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/demo/bundles'),
    },
    
    resolve: {
      extensions: ['.ts', '.js', '.json'],
      
      alias: {
          'unopinionated-angular-toolbox$': path.resolve(__dirname,'src/lib'),          
      },
      modules: [
          path.resolve(__dirname, 'src/demo'),
          path.resolve(__dirname, 'src/lib'),
          path.resolve(__dirname, 'node_modules')],
      
    },    
    module: {
        rules:[
            /* This rule set compiles the typescript files into js and 
             * fixes various parts for angular.  Order is important here 
             * and cannot be changed.
             */
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'string-replace-loader',
                            query: {
                                search: 'moduleId: module.id,',
                                replace: '',
                                flags: 'g'
                            }
                    },
                    // allow hot module reloading of the angular app
                    {
                        loader: '@angularclass/hmr-loader',
                        options: {
                            pretty: !isProd,
                            prod: isProd
                        }
                    },
                    { 
                        loader: 'ng-router-loader',
                        options: {
                            loader: 'async-import',
                            genDir: 'compiled',
                            aot: AOT
                    }
                    },
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: 'tsconfig.webpack.json'
                    }
                    },
                    {
                        loader: 'angular2-template-loader'
                    }
                ],
                // TODO: figure out how to exclude the entire ./e2e directory..
                exclude: [
                    /\.(spec|e2e|d)\.ts$/
                    ]
            },
            {
                test: /\.css$/,
                use: ['to-string-loader', 'css-loader'],
                exclude: [
                    path.resolve(__dirname, 'src/demo/styles.css'),
                    path.resolve(__dirname, 'src/demo/menu.css')
                ]
            },
            {
                test: /\.html$/,
                use: 'raw-loader',
                exclude: [
                    path.resolve(__dirname, 'src/demo/index.html'),
                    path.resolve(__dirname, 'src/demo/index.aot.html'),
                ]
            },
        ]
    },
    plugins: [
        // From angular.io webpack guide:
        // Workaround for angular/angular#11580
        new ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            path.resolve(__dirname, 'src'), // location of your src
            {} // a map of your routes
        ),

        // this plugin properly separates the bundles into chunks
        // otherwise the entire bundle is contained in app.bundle.js
        new CommonsChunkPlugin({
            name: ['app', 'uat', 'vendor', 'polyfills']
        }),
    ],

    /*
     * These options will be used by webpack-dev-server to
     * serve the demo with hot reloading.
     */
    devServer: {
        contentBase: path.join(__dirname, "src/demo"),
        compress: true,
        port: 4200,
        historyApiFallback: true,
        hot: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }

    },

    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

};