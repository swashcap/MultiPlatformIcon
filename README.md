# MultiPlatformIcons

_An experiment with icons for multiple platforms._

## Platforms

- [Android](./android/): `VectorDrawable` assets
- [iOS](./ios/): PDFs in an asset catalog
- [React](./react/): SVG components
- [React Native](./react-native/): multi-resolution PNGs wrapped in
  the [`Image`](https://reactnative.dev/docs/image) component

## Setup

1. Ensure [Node.js](https://nodejs.org/en/) v16.13.x is installed
2. Install [pnpm](https://pnpm.io/):
   - Optional: use [Corepack](https://nodejs.org/api/corepack.html)
3. Install dependencies:
   ```shell
   pnpm install
   ```
4. Build:
   ```shell
   pnpm run build
   ```

## Scripts

- `npm run build`: Build all the platforms
- `npm run clean`: Clean the build artifacts

## License

MIT. See [LICENSE](./LICENSE) for details.
