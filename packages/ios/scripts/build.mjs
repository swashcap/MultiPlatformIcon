import Handlebars from 'handlebars';
import lodash from 'lodash';
import path from 'path';
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { globby } from 'globby';
import { promises as fs } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BUILD_DIR = path.join(__dirname, '../dist/Sources/MultiPlatformIcon');

const RESOURCES_DIR = path.join(
  BUILD_DIR,
  'Resources/MultiPlatformIcon.xcassets'
);

/**
 * Build an asset catalog.
 *
 * @link https://developer.apple.com/library/archive/documentation/Xcode/Reference/xcode_ref-Asset_Catalog_Format/AssetTypes.html
 */
(async () => {
  Handlebars.registerHelper('toCamelCase', lodash.camelCase);

  const [
    svgs,
    assetCatalogTemplateContent,
    imageSetTemplateContent,
    enumTemplateContent,
    browser,
  ] = await Promise.all([
    globby(path.join(__dirname, '../../svg/dist/*.svg')),
    fs.readFile(
      path.join(__dirname, 'templates/AssetCatalogContents.json.hbs'),
      'utf-8'
    ),
    fs.readFile(
      path.join(__dirname, 'templates/ImageSetContents.json.hbs'),
      'utf-8'
    ),
    fs.readFile(
      path.join(__dirname, 'templates/MultiPlatformIconAsset.swift.hbs'),
      'utf-8'
    ),
    puppeteer.launch({
      args: [
        '--disable-dev-shm-usage',
        '--no-sandbox',
        '--allow-file-access-from-files',
        '--enable-local-file-accesses',
      ],
    }),
    fs.mkdir(RESOURCES_DIR, { recursive: true }),
  ]);

  const assetCatalogTemplate = Handlebars.compile(assetCatalogTemplateContent, {
    noEscape: true,
  });
  const imageSetTemplate = Handlebars.compile(imageSetTemplateContent, {
    noEscape: true,
  });
  const enumTemplate = Handlebars.compile(enumTemplateContent, {
    noEscape: true,
  });

  await Promise.all([
    fs.writeFile(
      path.join(RESOURCES_DIR, 'Contents.json'),
      assetCatalogTemplate({ author: 'com.swashcap' })
    ),
    fs.writeFile(
      path.join(BUILD_DIR, 'MultiPlatformIconAsset.swift'),
      enumTemplate({
        currentDate: new Date().toISOString(),
        icons: svgs.map((filename) => path.parse(filename).name),
      })
    ),
  ]);

  const writePDF = async (sourceFilename, outputFilename) => {
    const page = await browser.newPage();

    await page.goto(`file://${sourceFilename}`, {
      waitUntil: 'networkidle2',
    });

    await page.pdf({
      format: 'A4',
      path: outputFilename,
    });

    return page.close();
  };

  await Promise.all(
    svgs.map(async (filename) => {
      const { name } = path.parse(filename);

      const dirname = path.join(RESOURCES_DIR, `${name}.imageset`);

      await fs.mkdir(dirname, { recursive: true });

      await Promise.all([
        fs.writeFile(
          path.join(dirname, 'Contents.json'),
          imageSetTemplate({
            author: 'com.swashcap',
            filename: `${name}.pdf`,
          })
        ),
        writePDF(filename, path.join(dirname, `${name}.pdf`)),
      ]);

      console.log(
        `Created imageset: ${path.relative(
          path.join(__dirname, '..'),
          dirname
        )}`
      );
    })
  );

  await browser.close();
})();
