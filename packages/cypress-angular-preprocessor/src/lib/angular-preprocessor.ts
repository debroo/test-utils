import {
  AngularCompilerPlugin,
  AngularCompilerPluginOptions,
} from '@ngtools/webpack';
import { EventEmitter } from 'events';
import {startDevServer} from '@cypress/webpack-dev-server';
/**
 * Duplicate of {@link https://github.com/cypress-io/cypress/blob/5e05495abc4c7c5b95eebff90d9c763db7fe726d/npm/webpack-preprocessor/index.ts#L101}
 * meanwhile issue {@link https://github.com/cypress-io/cypress/issues/9569} is resolved.
 */
export interface FileEvent extends EventEmitter {
  filePath: string;
  outputPath: string;
  shouldWatch: boolean;
}
/**
 * Duplicate of {@link https://github.com/cypress-io/cypress/blob/5e05495abc4c7c5b95eebff90d9c763db7fe726d/npm/webpack-preprocessor/index.ts#L111}
 * meanwhile issue {@link https://github.com/cypress-io/cypress/issues/9569} is resolved.
 */
export type FilePreprocessor = (fileEvent: FileEvent) => Promise<string>;

export const devserver = (options: any) => {
  return startDevServer({
    options,
    webpackConfig: {
      /* Performance boost. */
      devtool: false,
      resolve: {
        extensions: ['.js', '.ts'],
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
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
          tsConfigPath: options.env.tsConfig,
          sourceMap: false,
          forkTypeChecker: true,
        }),
      ],
    },
  });
};
