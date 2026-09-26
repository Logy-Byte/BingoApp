const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname);

module.exports = {
  entry: path.resolve(appDirectory, 'index.web.js'),
  output: {
    filename: 'bundle.web.js',
    path: path.resolve(appDirectory, 'dist'),
  },
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js'],
    alias: {
      'react-native$': 'react-native-web',
      '@invertase/react-native-apple-authentication$': path.resolve(appDirectory, 'src/web-mocks/apple-authentication.js'),
      'react-native-svg$': path.resolve(appDirectory, 'src/web-mocks/react-native-svg.js'),
      'react-native-tts$': path.resolve(appDirectory, 'src/web-mocks/react-native-tts.js'),
      'react-native-haptic-feedback$': path.resolve(appDirectory, 'src/web-mocks/react-native-haptic-feedback.js'),
      '@react-native-async-storage/async-storage$': path.resolve(appDirectory, 'src/web-mocks/async-storage.js'),
      'react-native-url-polyfill/auto$': path.resolve(appDirectory, 'src/web-mocks/url-polyfill.js'),
      'react-native-url-polyfill$': path.resolve(appDirectory, 'src/web-mocks/url-polyfill.js'),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(tsx|ts|jsx|js)$/,
        exclude: /node_modules[/\\](?!react-native-safe-area-context)/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: false,
            babelrc: false,
            presets: [
              ['@babel/preset-env', { loose: true }],
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-typescript',
            ],
            plugins: [
              ['@babel/plugin-transform-class-properties', { loose: true }],
              ['@babel/plugin-transform-private-methods', { loose: true }],
              ['@babel/plugin-transform-private-property-in-object', { loose: true }],
              ['module:react-native-dotenv', { moduleName: '@env', path: '.env' }]
            ],
          },
        },
      },
      {
        test: /\.(jpg|png|woff|woff2|eot|ttf|svg|mp3)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(appDirectory, 'public/index.html'),
    }),
  ],
  devServer: {
    port: 8082,
    historyApiFallback: true,
    hot: true,
    open: true,
  },
};
