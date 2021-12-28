import Handlebars from 'handlebars';
import lodash from 'lodash';
import path from 'path';
import svg2vectordrawable from 'svg2vectordrawable';
import { fileURLToPath } from 'url';
import { globby } from 'globby';
import { promises as fs } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BUILD_DIR = path.join(__dirname, '../dist/src/main/res/drawable');

(async () => {
  const [svgs, templateContent] = await Promise.all([
    globby(path.join(__dirname, '../../svg/dist/*.svg')),
    fs.readFile(path.join(__dirname, 'templates/icon.xml.hbs'), 'utf-8'),
    fs.mkdir(BUILD_DIR, { recursive: true }),
  ]);

  const template = Handlebars.compile(templateContent, { noEscape: true });

  await Promise.all(
    svgs.map(async (filename) => {
      const { name } = path.parse(filename);

      const content = await fs.readFile(filename, 'utf-8');

      const outputFilename = path.join(
        BUILD_DIR,
        `ic_${lodash.snakeCase(name)}.xml`
      );

      const vectorDrawable = await svg2vectordrawable(content, {
        fillBlack: true,
        xmlTag: false,
      });

      await fs.writeFile(
        outputFilename,
        template({
          content: vectorDrawable,
          currentDate: new Date().toISOString(),
        })
      );

      console.log(
        `Created resource: ${path.relative(
          path.join(__dirname, '..'),
          outputFilename
        )}`
      );
    })
  );
})();
