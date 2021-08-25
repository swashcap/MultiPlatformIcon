import Handlebars from "handlebars";
import path from "path";
import sharp from "sharp";
import { exec } from "child_process";
import { fileURLToPath } from "url";
import { globby } from "globby";
import { promises as fs } from "fs";
import { promisify } from "util";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

;(async () => {
  try {
    const [
      svgs,
      iconTypeScriptTemplateContent,
      iconTemplateContent,
      indexTemplateContent,
      stylesTemplateContent,
    ] = await Promise.all([
      globby(path.join(__dirname, "../src/*.svg")),
      fs.readFile(path.join(__dirname, "templates/react-native/Icon.d.ts.hbs"), "utf-8"),
      fs.readFile(path.join(__dirname, "templates/react-native/Icon.js.hbs"), "utf-8"),
      fs.readFile(path.join(__dirname, "templates/react-native/index.js.hbs"), "utf-8"),
      fs.readFile(path.join(__dirname, "templates/react-native/styles.js.hbs"), "utf-8"),
      fs.mkdir(path.join(__dirname, "../react-native/src"), { recursive: true }),
    ]);

    const currentDate = new Date().toISOString();
    const iconTemplate = Handlebars.compile(iconTemplateContent, { noEscape: true });
    const iconTypescriptTemplate = Handlebars.compile(iconTypeScriptTemplateContent, { noEscape: true });
    const indexTemplate = Handlebars.compile(indexTemplateContent, { noEscape: true });
    const stylesTemplate = Handlebars.compile(stylesTemplateContent, { noEscape: true });

    await Promise.all([
      fs.writeFile(
        path.join(__dirname, `../react-native/src/index.js`),
        indexTemplate({
          currentDate,
          filenames: svgs.map((filename) => path.parse(filename).name),
        })
      ),
      fs.writeFile(
        path.join(__dirname, "../react-native/src/styles.js"),
        stylesTemplate({
          currentDate,
          size: 24,
        })
      ),
    ]);

    await Promise.all(svgs.map(async (filename) => {
      const stream = sharp(filename);
      const { name } = path.parse(filename);

      return Promise.all([
        fs.writeFile(
          path.join(__dirname, `../react-native/src/${name}.js`),
          iconTemplate({
            assetName: `${name}.png`,
            componentName: name,
            currentDate,
          }),
        ),
        fs.writeFile(
          path.join(__dirname, `../react-native/src/${name}.d.ts`),
          iconTypescriptTemplate({
            componentName: name,
            currentDate
          })
        ),
        stream.resize({ height: 24, width: 24 })
          .toFile(path.join(__dirname, `../react-native/src/${name}.png`)),
        stream.resize({ height: 48, width: 48 })
          .toFile(path.join(__dirname, `../react-native/src/${name}@2x.png`)),
        stream.resize({ height: 72, width: 72 })
          .toFile(path.join(__dirname, `../react-native/src/${name}@3x.png`)),
      ]);
    }));

    /**
     * react-native can't handle `import`s from outside the project root.
     * This build script copies the build artifacts into node_modules as a
     * workaround.
     *
     * @see {@link https://github.com/react-native-community/cli/issues/639}
     * @see {@link https://github.com/facebook/metro/issues/391}
     */
    await fs.mkdir(
      path.join(__dirname, "../demos/react-native/node_modules/multiplatformicon-react-native"),
      { recursive: true }
    );

    await Promise.all([
      promisify(exec)(
        `cp -r ${path.join(__dirname, "../react-native/")}* ${
          path.join(__dirname, "../demos/react-native/node_modules/multiplatformicon-react-native/")
        }`
      ),
    ]);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
