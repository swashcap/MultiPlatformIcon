import path from 'path';
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { globby } from 'globby';
import { promises as fs } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BUILD_DIR = path.join(__dirname, '../dist');

(async () => {
  const [svgs, browser] = await Promise.all([
    globby(path.join(__dirname, '../../svg/dist/*.svg')),
    puppeteer.launch({
      args: [
        '--disable-dev-shm-usage',
        '--no-sandbox',
        '--allow-file-access-from-files',
        '--enable-local-file-accesses',
      ],
    }),
    fs.mkdir(BUILD_DIR, { recursive: true }),
  ]);

  const writePDF = async (sourceFilename, outputFilename) => {
    const page = await browser.newPage();

    await page.goto(`file://${sourceFilename}`, { waitUntil: 'networkidle2' });

    await page.pdf({
      format: 'A4',
      path: outputFilename,
    });

    return page.close();
  };

  await Promise.all(
    svgs.map(async (filename) => {
      const { name } = path.parse(filename);

      const outputFilename = path.join(BUILD_DIR, `${name}.pdf`);

      await writePDF(filename, outputFilename);

      console.log(
        `Created PDF: ${path.relative(
          path.join(__dirname, '..'),
          outputFilename
        )}`
      );
    })
  );

  await browser.close();
})();
