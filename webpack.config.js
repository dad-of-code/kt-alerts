const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

// Common configuration for both builds
const commonConfig = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'ktAlert',
      type: 'umd',
      export: 'default',
    },
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};

// Export an array of configurations
module.exports = [
  // Regular version
  {
    ...commonConfig,
    name: 'regular',
    output: {
      ...commonConfig.output,
      filename: 'kt-alerts.js',
    }
  },
  // Minified version
  {
    ...commonConfig,
    name: 'minified',
    output: {
      ...commonConfig.output,
      filename: 'kt-alerts.min.js',
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false,
          },
        },
      })],
    },
  }
];
