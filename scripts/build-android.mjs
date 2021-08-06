import lodash from "lodash";
import path from "path";
import svg2vectordrawable from "svg2vectordrawable";
import { fileURLToPath } from "url";
import { globby } from "globby";
import { promises as fs } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS_DIRNAME = path.join(__dirname, "../android/src/main/res/drawable");

;(async () => {
  try {
    const [svgs] = await Promise.all([
      globby(path.join(__dirname, "../src/*.svg")),
      fs.mkdir(ASSETS_DIRNAME, { recursive: true })
    ]);

    await Promise.all(svgs.map(async (filename) => {
      const { name } = path.parse(filename)

      const content = await fs.readFile(filename, "utf-8");

      const vectorDrawable = await svg2vectordrawable(
        content,
        {
          fillBlack: true,
          xmlTag: true,
        }
      );

      return fs.writeFile(
        path.join(ASSETS_DIRNAME, `${lodash.snakeCase(name)}.xml`),
        vectorDrawable
      );
    }));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
