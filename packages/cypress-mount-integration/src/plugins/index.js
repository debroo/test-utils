const  { startDevServer } = require('@cypress/webpack-dev-server');
const { AngularCompilerPlugin } = require('@ngtools/webpack');

module.exports = (on, config) => {
  on('dev-server:start', (options) => {
    return startDevServer({
      options,
      webpackConfig: {
        /* Performance boost. */
        devtool: 'inline-source-map',
        resolve: {
          extensions: ['.js', '.ts'],
        },
        module: {
          rules: [
            {
              // test: /\.ts$/,
              test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
              loader: '@ngtools/webpack',
            },
            /* Use raw-loader as AngularCompilerPlugin handles the rest. */
            {
              test: /\.css$/,
              loader: 'raw-loader',
            },
            /* Use raw-loader as AngularCompilerPlugin handles the rest. */
            {
              test: /\.scss$/,
              use: ['raw-loader', 'sass-loader'],
            },
          ],
        },
        plugins: [
          new AngularCompilerPlugin({
            directTemplateLoading: true,
            // tsConfigPath: config.env.tsConfig,
            sourceMap: false,
            forkTypeChecker: true,
          }),
        ],
      }
    })
  });
};
