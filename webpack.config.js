// Bring in Node's 'path' module to manage file paths
const path = require('path');

// Plugin that extracts compiled CSS into a real .css file
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // Use 'development' so watch mode is fast and readable
  mode: 'development',

  // The main SCSS file to compile
  entry: './src/style.scss',

  // Output folder and dummy JS file (Webpack always emits JS)
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'dummy.js',
    clean: true, // Clean dist/ before each build
  },

  // 🔥 WATCH MODE SETTINGS
  // When "watch: true" is set,
  // Webpack automatically re-compiles **whenever any imported file changes**.
  watch: true, // <--- Webpack keeps running and watches for changes

  watchOptions: {
    // Ignore node_modules because changes there are irrelevant for SCSS
    ignored: /node_modules/,

    // How long (in ms) Webpack waits after a file change before rebuilding
    // Higher = fewer builds, lower = faster response
    aggregateTimeout: 200, // default: 300

    // Check for file changes every X ms (useful for some OS/VM file systems)
    poll: 1000, // 1 second interval — set to false for native FS events
  },
  // END WATCH MODE CONFIG 🔥

  module: {
    rules: [
      {
        test: /\.(sa|sc)ss$/,
        use: [
          // Extracts CSS into a physical file
          MiniCssExtractPlugin.loader,

          // Interprets @import and url() in CSS
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },

          // Compiles SCSS → CSS
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },

  plugins: [
    // Output CSS file name
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],

  // Generates source maps for easier debugging
  devtool: 'source-map',
};
