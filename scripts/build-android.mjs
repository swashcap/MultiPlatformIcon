import Handlebars from "handlebars"
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
    const [svgs, templateContent] = await Promise.all([
      globby(path.join(__dirname, "../src/*.svg")),
      fs.readFile(path.join(__dirname, "templates/android/icon.xml.hbs"), "utf-8"),
      fs.mkdir(ASSETS_DIRNAME, { recursive: true })
    ]);

    const template = Handlebars.compile(templateContent, { noEscape: true });

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
        path.join(ASSETS_DIRNAME, `ic_${lodash.snakeCase(name)}.xml`),
        template({
          content: vectorDrawable,
          currentDate: new Date().toISOString(),
        }),
      );
    }));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
