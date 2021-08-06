import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { globby } from "globby";
import { promises as fs } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

;(async () => {
  try {
    const svgs = await globby(path.join(__dirname, "../src/*.svg"));

    await fs.mkdir(path.join(__dirname, "../react-native"));

    await Promise.all(svgs.map(async (filename) => {
      const stream = sharp(filename);
      const { name } = path.parse(filename);

      return Promise.all([
        stream.resize({ height: 24, width: 24 })
          .toFile(path.join(__dirname, `../react-native/${name}.png`)),
        stream.resize({ height: 48, width: 48 })
          .toFile(path.join(__dirname, `../react-native/${name}@2x.png`)),
        stream.resize({ height: 72, width: 72 })
          .toFile(path.join(__dirname, `../react-native/${name}@3x.png`)),
      ]);
    }));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
