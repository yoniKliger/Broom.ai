const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'src/cleaner/index': './src/cleaner/index.ts',
    'src/secrets-dictionary/index': './src/secrets-dictionary/index.ts'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'src/secrets-dictionary/index.html',
          to: 'src/secrets-dictionary/index.html'
        }
      ],
    }),
  ],
  devtool: 'source-map'
}; 