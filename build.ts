import * as glob from 'glob';
import * as rimraf from 'rimraf';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import * as Bundler from 'parcel-bundler';
import * as fs from 'fs';

const bundleFile = (
  inDir: string,
  inFile: string,
  outDir: string,
  outFile: string,
) =>
  new Bundler(path.join(inDir, inFile), {
    outDir,
    outFile,
    sourceMaps: false,
    minify: true,
    target: 'browser',
    hmr: false,
    bundleNodeModules: true,
  }).bundle();

const bundlePlugin = async (name: string) => {
  const inDir = path.join('plugins', name);
  const outDir = path.join('build', name);

  mkdirp.sync(outDir);

  fs.writeFileSync(
    path.join(outDir, 'manifest.json'),
    JSON.stringify({
      name,
      id: name,
      api: '1.0.0',
      ui: 'ui.html',
      main: 'core.js',
    }),
  );

  await bundleFile(inDir, 'core.ts', outDir, 'core.js');
  await bundleFile(inDir, 'ui.html', outDir, 'ui.html');
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
