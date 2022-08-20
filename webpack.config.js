import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

export default (env, argv) => {
  const config = {
    entry: {
      init: './src/init.ts',
      OptionsApp: './src/options/OptionsApp.tsx',
      PopupApp: './src/popup/PopupApp.tsx',
      app: './src/app/app.ts',
    },
    output: {
      path: path.resolve(__dirname, 'dist'), // This is the default, but clean webpack plugin requires it to run
    },
    plugins: [
      new CleanWebpackPlugin(),

      // Maybe I should just use react router?
      // But still really don't want app and init to run in the popup/options, so I need to pick and choose that still
      new HtmlWebpackPlugin({
        title: 'Popup',
        chunks: ['PopupApp'],
        template: './src/popup/popup.html',
        filename: './popup.html',
      }),
      new HtmlWebpackPlugin({
        title: 'Options',
        chunks: ['OptionsApp'],
        template: './src/options/options.html',
        filename: './options.html',
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: './src/manifest.json', to: './[name][ext]' },
          { from: './src/assets/images/icons/*', to: './images/[name][ext]' },
        ],
      }),
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      fallback: {
        path: require.resolve('path-browserify'),
      },
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          include: path.resolve(__dirname, 'src'),
          use: [
            'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.(ts|tsx)?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },
  };

  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map';
  }
  // Theoretically, can get this working by exposing the source maps with web_accessible_resources
  // Haven't figured out how to correctly expose to the right places though.
  //  else {
  //   config.devtool = 'source-map';
  // }

  return config;
};
