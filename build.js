const glob = require('glob');
const rimraf = require('rimraf');
const path = require('path');
const mkdirp = require('mkdirp');
const webpack = require('webpack');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const bundleFile = (inDir, inFile, outDir, outFile) =>
  new Promise((resolve, reject) => {
    const plugins = [];

    if (inFile === 'ui.js') {
      plugins.push(
        new HtmlWebpackPlugin({
          filename: 'ui.html',
          inlineSource: '.(js|css)$',
        }),
      );

      plugins.push(new HtmlWebpackInlineSourcePlugin());
    }

    webpack(
      {
        mode: 'development',
        devtool: false,
        entry: path.resolve(inDir, inFile),
        output: {
          path: path.resolve(outDir),
          filename: outFile,
        },
        module: {
          rules: [
            {
              test: /\.jsx?$/,
              loader: 'babel-loader',
            },
          ],
        },
        plugins,
      },
      (error, stats) => {
        if (error || stats.hasErrors()) {
          console.error(error || stats.toJson());
          reject(error || stats);
        } else {
          resolve(stats);
        }
      },
    );
  });

const bundlePlugin = async (name) => {
  const inDir = path.join('plugins', name);
  const outDir = path.join('build', name);

  mkdirp.sync(outDir);

  let manifest = {
    name,
    id: name,
    api: '1.0.0',
    ui: 'ui.html',
    main: 'core.js',
  };

  try {
    const localManifest = JSON.parse(
      fs.readFileSync(path.join(inDir, 'manifest.json'), 'utf-8'),
    );

    manifest = {
      ...manifest,
      ...localManifest,
    };
  } catch (error) {}

  fs.writeFileSync(
    path.join(outDir, 'manifest.json'),
    JSON.stringify(manifest),
  );

  await bundleFile(inDir, 'core.js', outDir, 'core.js');
  await bundleFile(inDir, 'ui.js', outDir, 'ui.js');
};

const bundle = async () => {
  rimraf.sync('build');
  mkdirp.sync('build');

  for (const pluginPath of glob.sync('plugins/*')) {
    const [, name] = pluginPath.split('/');
    await bundlePlugin(name);
  }

  process.exit(0);
};

bundle();
