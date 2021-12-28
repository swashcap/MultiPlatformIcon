import del from 'del';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
  try {
    await del([
      path.join(__dirname, '../android/src/main/res/drawables'),
      path.join(
        __dirname,
        '../ios/Sources/MultiPlatformIcon/MultiPlatformIconAsset.swift'
      ),
      path.join(__dirname, '../ios/Sources/MultiPlatformIcon/Resources'),
      path.join(__dirname, '../react'),
      path.join(__dirname, '../react-native/src'),
    ]);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
