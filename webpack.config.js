import {fileURLToPath} from 'url';
import path from 'path';
import webpack from 'webpack';
import Dotenv from 'dotenv-webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  experiments: {
    topLevelAwait: true,
  },
  mode: 'none',
  entry: path.join(__dirname, 'client', 'app.tsx'),
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: {
          loader: 'url-loader?name=assets/images/[name].[ext]',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-typescript',
                '@babel/preset-react',
              ],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.*', '.js', '.jsx', '.ts', '.tsx'],
  },
  output: {
    // path: path.join(__dirname, 'public/dist'),
    // filename: 'bundle.js',
    // publicPath: '/public/dist/',
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new Dotenv()],
  devServer: {
    hot: true,
    historyApiFallback: true,
    devMiddleware: {
      writeToDisk: true,
    },
    client: {
      overlay: false,
    },
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.PORT}`,
      },
    },
  },
};

export default config;
