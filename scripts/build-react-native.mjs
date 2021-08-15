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
    const svgs = await globby(path.join(__dirname, "../src/*.svg"));

    await fs.mkdir(path.join(__dirname, "../react-native"), { recursive: true });

    await fs.writeFile(
      path.join(__dirname, `../react-native/index.js`),
      svgs
        .map((filename) => `export * from "./${path.parse(filename).name}";`)
        .join("\n")
    );

    await Promise.all(svgs.map(async (filename) => {
      const stream = sharp(filename);
      const { name } = path.parse(filename);

      return Promise.all([
        fs.writeFile(
          path.join(__dirname, `../react-native/${name}.js`),
          `import * as React from "react";
import { Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  icon: {
    height: 24,
    resizeMode: "contain",
    width: 24,
  }
});

export const ${name} = (props) => {
  const { style, ...rest } = props;

  return React.createElement(
    Image,
    {
      style: [styles.icon, style],
      ...rest,
      source: require("./${name}.png"),
    }
  );
}`
        ),
        stream.resize({ height: 24, width: 24 })
          .toFile(path.join(__dirname, `../react-native/${name}.png`)),
        stream.resize({ height: 48, width: 48 })
          .toFile(path.join(__dirname, `../react-native/${name}@2x.png`)),
        stream.resize({ height: 72, width: 72 })
          .toFile(path.join(__dirname, `../react-native/${name}@3x.png`)),
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
      path.join(__dirname, "../demos/react-native/node_modules/multiplatformicon"),
      { recursive: true }
    );

    await Promise.all([
      fs.writeFile(
        path.join(__dirname, "../demos/react-native/node_modules/multiplatformicon/package.json"),
        JSON.stringify({
          main: "index.js",
          name: "multiplatformicon",
          version: "0.0.0",
        })
      ),
      promisify(exec)(
        `cp ${path.join(__dirname, "../react-native/")}* ${
          path.join(__dirname, "../demos/react-native/node_modules/multiplatformicon/")
        }`
      ),
    ]);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
