import * as glob from 'glob';
import * as rimraf from 'rimraf';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import * as Bundler from 'parcel-bundler';

const bundleFile = (inDir: string, outDir: string, name: string) =>
  new Bundler(path.join(inDir, `${name}.ts`), {
    outDir,
    outFile: `${name}.js`,
    sourceMaps: false,
  }).bundle();

const bundlePlugin = async (name: string) => {
  const inDir = path.join('plugins', name);
  const outDir = path.join('build', name);

  await bundleFile(inDir, outDir, 'core');
  await bundleFile(inDir, outDir, 'ui');
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
