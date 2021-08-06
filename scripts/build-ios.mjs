import lodash from "lodash";
import path from "path";
import puppeteer from "puppeteer";
import { fileURLToPath } from "url";
import { globby } from "globby";
import { promises as fs } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS_DIRNAME = path.join(__dirname, "../ios/Sources/MultiPlatformIcon.xcassets");
const CLASSES_DIRNAME = path.join(__dirname, "../ios/Classes");

/**
 * Build an asset catalog.
 *
 * @link https://developer.apple.com/library/archive/documentation/Xcode/Reference/xcode_ref-Asset_Catalog_Format/AssetTypes.html
 */
;(async () => {
  try {
    const [
      svgs,
      browser
    ] = await Promise.all([
      globby(path.join(__dirname, "../src/*.svg")),
      puppeteer.launch({
        args: [
          "--disable-dev-shm-usage",
          "--no-sandbox",
          "--allow-file-access-from-files",
          "--enable-local-file-accesses",
        ],
      }),
      fs.mkdir(ASSETS_DIRNAME, { recursive: true }),
      fs.mkdir(CLASSES_DIRNAME, { recursive: true }),
    ]);

    await Promise.all([
      fs.writeFile(
        path.join(ASSETS_DIRNAME, "Contents.json"),
        JSON.stringify({
          info: {
            author: "com.swashcap",
            version: 1,
          }
        })
      ),
      fs.writeFile(
        path.join(CLASSES_DIRNAME, "MultiPlatformIcon.swift"),
        `// This file is generated!

import UIKit

public enum MultiPlatformIcon: CaseIterable {
${svgs
  .map((filename) => `  case ${lodash.camelCase(path.parse(filename).name)}`)
  .join("\n")}

  public var resourceString: String {
    switch self {
${svgs
  .map((filename) => {
    const { name } = path.parse(filename);

    return `    case ${lodash.camelCase(name)}: return "${name}"`
  })
  .join("\n")}
    }
  }
}`
      ),
      fs.writeFile(
        path.join(CLASSES_DIRNAME, "UIImage+MultiPlatformIcon.swift"),
        `// This file is generated!

import UIKit

public extension UIImage {
  convenience init(multiPlatformIcon: MultiPlatformIcon) {
    self.init(named: multiPlatformIcon.resourceString)
  }
}`
      ),
    ]);

    const writePDF = async (sourceFilename, outputFilename) => {
      const page = await browser.newPage();

      await page.goto(`file://${sourceFilename}`, { waitUntil: "networkidle2" });

      await page.pdf({
        format: "A4",
        path: outputFilename,
      });

      return page.close();
    }

    await Promise.all(svgs.map(async (filename) => {
      const { name } = path.parse(filename);

      const dirname = path.join(ASSETS_DIRNAME, `${name}.imageset`);

      await fs.mkdir(dirname, { recursive: true });

      return Promise.all([
        fs.writeFile(
          path.join(dirname, "Contents.json"),
          JSON.stringify({
            images: [{
              filename: path.join(dirname, `${name}.pdf`),
              idiom: "universal",
            }],
            info: {
              author: "com.swashcap",
              version: 1,
            },
            properties: {
              "template-rendering-intent": "template",
            },
          })
        ),
        writePDF(filename, path.join(dirname, `${name}.pdf`)),
      ]);
    }));

    await browser.close();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
