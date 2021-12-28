import Handlebars from 'handlebars';
import lodash from 'lodash';
import path from 'path';
import { fileURLToPath } from 'url';
import { globby } from 'globby';
import { promises as fs } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BUILD_DIR = path.join(__dirname, '../dist');

const SIZE = 24;

(async () => {
  const [
    pngFilenames,
    iconTemplateContent,
    indexTemplateContent,
    stylesTemplateContent,
  ] = await Promise.all([
    globby(path.join(__dirname, '../../png/dist/*.png')),
    fs.readFile(path.join(__dirname, 'templates/Icon.tsx.hbs'), 'utf-8'),
    fs.readFile(path.join(__dirname, 'templates/index.tsx.hbs'), 'utf-8'),
    fs.readFile(path.join(__dirname, 'templates/styles.tsx.hbs'), 'utf-8'),
    fs.mkdir(BUILD_DIR, { recursive: true }),
  ]);

  const pngs = lodash.groupBy(pngFilenames, (filename) =>
    path.parse(filename).name.replace(/@.*$/, '')
  );
  const currentDate = new Date().toISOString();
  const iconTemplate = Handlebars.compile(iconTemplateContent, {
    noEscape: true,
  });
  const indexTemplate = Handlebars.compile(indexTemplateContent, {
    noEscape: true,
  });
  const stylesTemplate = Handlebars.compile(stylesTemplateContent, {
    noEscape: true,
  });

  await Promise.all([
    fs.writeFile(
      path.join(BUILD_DIR, 'index.tsx'),
      indexTemplate({
        currentDate,
        filenames: Object.keys(pngs),
      })
    ),
    fs.writeFile(
      path.join(BUILD_DIR, 'styles.tsx'),
      stylesTemplate({
        currentDate,
        size: SIZE,
      })
    ),
  ]);

  await Promise.all(
    Object.keys(pngs).map(async (name) => {
      const filenames = pngs[name];

      const outputFilename = path.join(BUILD_DIR, `${name}.tsx`);

      await Promise.all([
        fs.writeFile(
          outputFilename,
          iconTemplate({
            assetName: `./${name}.png`,
            componentName: name,
            currentDate,
          })
        ),
        ...filenames.map((filename) =>
          fs.copyFile(filename, path.join(BUILD_DIR, path.parse(filename).base))
        ),
      ]);

      console.log(
        `Created component: ${path.resolve(
          path.join(__dirname, '..'),
          outputFilename
        )}`
      );
    })
  );
})();
