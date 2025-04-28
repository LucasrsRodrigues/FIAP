const { getDefaultConfig } = require('expo/metro-config');

const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');


module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  return wrapWithReanimatedMetroConfig(config);
})();