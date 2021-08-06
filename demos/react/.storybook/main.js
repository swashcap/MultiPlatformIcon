module.exports = {
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  stories: [
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  typescript: {
    check: false,
    reactDocgen: false,
  },
}
