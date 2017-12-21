const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const tests = {
  vendors: /node_modules\/(?:react\/|process|pdfmake|object-assign|react-dom|fbjs|prop-types|create-react-class)/
};
const minChunksFn = (type) => {
  const testinString = tests[type];
  return (m) => {
    const te = testinString.test(m.context);
    // console.log('cont', m.context)
    // console.log('te', te)
    return te;
  }
};

// const nodeModules = {};
// fs.readdirSync('node_modules')
//   .filter((x) => {
//     return ['.bin'].indexOf(x) === -1;
//   })
//   .forEach((mod) => {
//     nodeModules[mod] = 'commonjs ' + mod;
//   });

const front = {
  node: {
    dns: 'mock',
    tls: 'mock',
    net: 'mock'
  },
  entry: {
    main: [`./app/Main.js`],
    // vendors: ['react', 'react-dom']
  },
  devServer: {
    inline: true,
    compress: true,
    contentBase: path.join(__dirname, '../', 'build', 'public'),
    historyApiFallback: {
      index: '/'
    }
  },
  devtool: 'eval',
  // debug: true,
  externals: { nodemailer: 'commonjs nodemailer', 'email-templates': 'commonjs email-templates' },
  output: {
    path: path.join(__dirname, '../', 'build', 'public'),
    filename: "js/[name].bundle.js",
    publicPath: '/',
    chunkFilename : 'js/[name].js',
  },
  // resolveLoader: {
  //   modulesDirectories: ['node_modules']
  // },
  plugins: [
    new HtmlWebpackPlugin({
       title: 'Jarvis Home @ Dev Server',
       template: path.join(__dirname, 'template_html', 'index_dev.ejs')
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        minChunks: (m) => /node_modules/.test(m.context)
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors',
        minChunks: minChunksFn('vendors')
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //     name: 'manifest',
    //     minChunks: Infinity
    // }),
    // new webpack.ProvidePlugin({
    //   _: 'lodash'
    // })
  ],
  resolve: {
    alias: {
      jsencrypt: path.join(__dirname, '../', 'external', 'encrypted')
    },
    extensions: ['.js', '.css', '.ttf', '.eot', '.woff'],
    modules: ['node_modules']
  },
  module: {
    // noParse: [/node_modules\/get-pixels\/lib\/nodemailer\.js/, /node_modules\/object-hash\/dist\/object_hash.js/, /node_modules\/get-pixels\/dom-pixels\.js/, /node_modules\/get-pixels\/node-pixels\.js/],
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader']},
      // {
      //   test:    /(Comm|Pos)Workers\.js/,
      //   exclude: /(node_modules)/,
      //   loader:  "worker-loader",
      //   options: {
      //     // inline: true,
      //     // fallback: false,
      //     name: "js/front.worker.js",
      //   },
      // },
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['env', 'es2015', 'stage-0', 'react']
          }
        }
      },
      { test: /\.(eot|ttf|woff|jpg|png|gif|svg)/, use: 'url-loader' }
    ]
  }
};

module.exports = [front];
