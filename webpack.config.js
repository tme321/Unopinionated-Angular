const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');
const cssnano = require('cssnano');

const { NoEmitOnErrorsPlugin, SourceMapDevToolPlugin, NamedModulesPlugin } = require('webpack');
const { GlobCopyWebpackPlugin, BaseHrefWebpackPlugin } = require('@angular/cli/plugins/webpack');
const { CommonsChunkPlugin } = require('webpack').optimize;
const { AotPlugin } = require('@ngtools/webpack');

const nodeModules = path.join(process.cwd(), 'node_modules');
const realNodeModules = fs.realpathSync(nodeModules);
const genDirNodeModules = path.join(process.cwd(), 'src', '$$_gendir', 'node_modules');
const entryPoints = ["inline","polyfills","sw-register","vendor", "styles", "app","uat" ];
const minimizeCss = false;
const baseHref = "";
const deployUrl = "";

var AOT = false;
var isProd = false;

const postcssPlugins = function () {
        // safe settings based on: https://github.com/ben-eb/cssnano/issues/358#issuecomment-283696193
        const importantCommentRe = /@preserve|@license|[@#]\s*source(?:Mapping)?URL|^!/i;
        const minimizeOptions = {
            autoprefixer: false,
            safe: true,
            mergeLonghand: false,
            discardComments: { remove: (comment) => !importantCommentRe.test(comment) }
        };
        return [
            postcssUrl({
                url: (URL) => {
                    // Only convert root relative URLs, which CSS-Loader won't process into require().
                    if (!URL.startsWith('/') || URL.startsWith('//')) {
                        return URL;
                    }
                    if (deployUrl.match(/:\/\//)) {
                        // If deployUrl contains a scheme, ignore baseHref use deployUrl as is.
                        return `${deployUrl.replace(/\/$/, '')}${URL}`;
                    }
                    else if (baseHref.match(/:\/\//)) {
                        // If baseHref contains a scheme, include it as is.
                        return baseHref.replace(/\/$/, '') +
                            `/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
                    }
                    else {
                        // Join together base-href, deploy-url and the original URL.
                        // Also dedupe multiple slashes into single ones.
                        return `/${baseHref}/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
                    }
                }
            }),
            autoprefixer(),
        ].concat(minimizeCss ? [cssnano(minimizeOptions)] : []);
    };

module.exports = {
  "resolve": {
    "extensions": [
      ".ts",
      ".js"
    ],
    "modules": [
      "./node_modules",
      "./node_modules"
    ],
    "symlinks": true
  },
  "resolveLoader": {
    "modules": [
      "./node_modules",
      "./node_modules"
    ]
  },
  entry: {
    app: [ './src/demo/main.ts' ],
    polyfills: [ './src/demo/polyfills.ts' ],
    vendor: [ './src/demo/vendor.ts' ],
    styles: ['./src/demo/css/styles.css', './src/demo/css/menu.css'],
    uat: [ './src/lib/index.ts' ],    
  },
  output: {
    path: path.join(process.cwd(), "dist/demo/bundles"),
    filename: "[name].bundle.js",
    chunkFilename: "[id].chunk.js"
  },
  "module": {
    "rules": [
      {
        "enforce": "pre",
        "test": /\.js$/,
        "loader": "source-map-loader",
        "exclude": [
          /\/node_modules\//,
          // workaround for this issue per
          // https://stackoverflow.com/questions/43349869/build-angular2-app-with-webpack-cant-find-compiler-es5-ts
          path.join(__dirname, 'node_modules', '@angular/compiler')
        ]
      },
      {
        "test": /\.json$/,
        "loader": "json-loader"
      },
      {
        "test": /\.html$/,
        "loader": "raw-loader"
      },
      {
        "test": /\.(eot|svg)$/,
        "loader": "file-loader?name=[name].[hash:20].[ext]"
      },
      {
        "test": /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|cur|ani)$/,
        "loader": "url-loader?name=[name].[hash:20].[ext]&limit=10000"
      },
      {
        "exclude": [
          path.join(process.cwd(), "src/demo/css/styles.css"),
          path.join(process.cwd(), "src/demo/css/menu.css")
        ],
        "test": /\.css$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          }
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "src/demo/css/styles.css"),
          path.join(process.cwd(), "src/demo/css/menu.css")
        ],
        "test": /\.scss$|\.sass$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "sass-loader",
            "options": {
              "sourceMap": false,
              "precision": 8,
              "includePaths": []
            }
          }
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "src/demo/css/styles.css"),
          path.join(process.cwd(), "src/demo/css/menu.css")
        ],
        "test": /\.less$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "less-loader",
            "options": {
              "sourceMap": false
            }
          }
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "src/demo/css/styles.css"),
          path.join(process.cwd(), "src/demo/css/menu.css")
        ],
        "test": /\.styl$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "stylus-loader",
            "options": {
              "sourceMap": false,
              "paths": []
            }
          }
        ]
      },

      {
        "include": [
          path.join(process.cwd(), "src/demo/css/styles.css"),
          path.join(process.cwd(), "src/demo/css/menu.css")
        ],
        "test": /\.css$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          }
        ]
      },
      
      {
        "include": [
          path.join(process.cwd(), "src/demo/css/styles.css")
          //path.join(process.cwd(), "src/demo/menu.css")
        ],
        "test": /\.scss$|\.sass$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "sass-loader",
            "options": {
              "sourceMap": false,
              "precision": 8,
              "includePaths": []
            }
          }
        ]
      },
      {
        "include": [
          path.join(process.cwd(), "src/demo/css/styles.css")
          //path.join(process.cwd(), "src/demo/menu.css")
        ],
        "test": /\.less$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "less-loader",
            "options": {
              "sourceMap": false
            }
          }
        ]
      },
      {
        "include": [
          path.join(process.cwd(), "src/demo/css/styles.css")
          //path.join(process.cwd(), "src/demo/menu.css")
        ],
        "test": /\.styl$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "stylus-loader",
            "options": {
              "sourceMap": false,
              "paths": []
            }
          }
        ]
      },
      {
        "test": /\.ts$/,
        "loader": "@ngtools/webpack"
      }
    ]
  },
  "plugins": [
    new NoEmitOnErrorsPlugin(),
    new GlobCopyWebpackPlugin({
      "patterns": [
        "assets",
        "favicon.ico"
      ],
      "globOptions": {
        "cwd": path.join(process.cwd(), "src"),
        "dot": true,
        "ignore": "**/.gitkeep"
      }
    }),
    new ProgressPlugin(),
    /*
    new SourceMapDevToolPlugin({
      "filename": "[file].map[query]",
      "moduleFilenameTemplate": "[resource-path]",
      "fallbackModuleFilenameTemplate": "[resource-path]?[hash]",
      "sourceRoot": "webpack:///"
    }),
    */
    new HtmlWebpackPlugin({
      "template": "./src/demo/index.html",
      "filename": "./index.html",
      "hash": false,
      "inject": true,
      "compile": true,
      "favicon": false,
      "minify": false,
      "cache": true,
      "showErrors": true,
      "chunks": "all",
      "excludeChunks": [],
      "title": "Webpack App",
      "xhtml": true,
      "chunksSortMode": function sort(left, right) {
        let leftIndex = entryPoints.indexOf(left.names[0]);
        let rightindex = entryPoints.indexOf(right.names[0]);
        if (leftIndex > rightindex) {
            return 1;
        }
        else if (leftIndex < rightindex) {
            return -1;
        }
        else {
            return 0;
        }
    }
    }),
    new BaseHrefWebpackPlugin({}),
    new CommonsChunkPlugin({
      "minChunks": 2,
      "async": "common"
    }),
    new CommonsChunkPlugin({
      "name": [
        "inline"
      ],
      "minChunks": null
    }),
    new CommonsChunkPlugin({
      "name": [
        "vendor"
      ],
      "minChunks": (module) => {
                return module.resource
                    && (module.resource.startsWith(nodeModules)
                        || module.resource.startsWith(genDirNodeModules)
                        || module.resource.startsWith(realNodeModules));
            },
      "chunks": [
        "app", 
      ]
    }),
    new NamedModulesPlugin({}),
    new AotPlugin({
      "mainPath": "main.ts",
      "hostReplacementPaths": {
        "environments\\environment.ts": "environments\\environment.ts"
      },
      "exclude": [],
      "tsConfigPath": "src/demo/tsconfig-aot.json",
      "skipCodeGeneration": true
    })
  ],
  node: {
    "fs": "empty",
    "global": true,
    "crypto": "empty",
    "tls": "empty",
    "net": "empty",
    "process": true,
    "module": false,
    "clearImmediate": false,
    "setImmediate": false
  },
  devServer: {
    "historyApiFallback": true
  }

    /* OLD

    /*
     * Define the different chunks webpack will build
     * /
    entry: { 
        polyfills: './src/demo/polyfills.ts',
        vendor: './src/demo/vendor.ts',
        styles: './src/demo/styles.ts',
        uat: './src/lib/index.ts',
        app:'./src/demo/main.ts'
    },
    output: {
        filename: '[name].bundle.js',
        /* sourceMapFilename: '[file].map', * /
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
             * /
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
            // this should load the site css

            /*
            * css loader support for *.css files (styles directory only)
            * Loads external css styles into the DOM, supports HMR
            *
            * /
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                include: [path.resolve(__dirname,'src', 'demo', 'css')]
            },

            // this allows angular 2 components to load their specific css
            {
                test: /\.css$/,
                use: ['to-string-loader', 'css-loader'],
                exclude: [
                    path.resolve(__dirname, 'src/demo/css')
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            // this allows angular 2 components to load their specific html templates
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

        /* this plugin properly separates the bundles into chunks
         * otherwise the entire bundle is contained in app.bundle.js
         * /
        new CommonsChunkPlugin({
            name: ['app', 'uat', 'vendor', 'polyfills', 'styles']
        }),

        /*
         * Bring in the css files included by /src/demo/styles.ts
         * /
        new ExtractTextPlugin('[name].css'),

        /*
         * Insert the webpack bundles into the index.html file.
        * /
        new HtmlWebpackPlugin({
            template: 'src/demo/index.html'
        }),

    ],

    /*
     * These options will be used by webpack-dev-server to
     * serve the demo with hot reloading.
     * /
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

    /*
     * Some node environment settings
     * /
    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

    */
};