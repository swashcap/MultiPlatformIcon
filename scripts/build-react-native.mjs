import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { globby } from "globby";
import { promises as fs } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

;(async () => {
  try {
    const svgs = await globby(path.join(__dirname, "../src/*.svg"));

    await fs.mkdir(path.join(__dirname, "../react-native"), { recursive: true });

    await fs.writeFile(
      path.join(__dirname, `../react-native/index.tsx`),
      svgs
        .map((filename) => `export * from "./${path.parse(filename).name}";`)
        .join("\n")
    );

    await Promise.all(svgs.map(async (filename) => {
      const stream = sharp(filename);
      const { name } = path.parse(filename);

      return Promise.all([
        fs.writeFile(
          path.join(__dirname, `../react-native/${name}.tsx`),
          `import * as React from "react";
import { Image, ImageProps, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  icon: {
    height: 24,
    resizeMode: "contain",
    width: 24,
  }
});

export type ${name}Props = ImageProps;

export const ${name}: React.FunctionComponent<${name}Props> = (props) => {
  const { style, ...rest } = props;

  return (
    <Image
      style={[styles.icon, style]}
      {...rest}
      source={require("${name}.png")}
    />
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
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
