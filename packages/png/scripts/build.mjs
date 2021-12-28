import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { globby } from 'globby';
import { promises as fs } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BUILD_DIR = path.join(__dirname, '../dist');

const SIZE = 24;

(async () => {
  const [svgs] = await Promise.all([
    globby(
      path.join(__dirname, '../../svg/dist/*.svg'),
      fs.mkdir(BUILD_DIR, { recursive: true })
    ),
  ]);

  await Promise.all(
    svgs.map(async (filename) => {
      const stream = sharp(filename);
      const { name } = path.parse(filename);

      await Promise.all([
        stream
          .resize({ height: SIZE, width: SIZE })
          .toFile(path.join(BUILD_DIR, `${name}.png`)),
        stream
          .resize({ height: SIZE * 2, width: SIZE * 2 })
          .toFile(path.join(BUILD_DIR, `${name}@2x.png`)),
        stream
          .resize({ height: SIZE * 3, width: SIZE * 3 })
          .toFile(path.join(BUILD_DIR, `${name}@3x.png`)),
      ]);

      console.log(
        `Created PNG: ${path.resolve(
          path.join(__dirname, '..'),
          path.join(BUILD_DIR, name)
        )}`
      );
    })
  );
})();
