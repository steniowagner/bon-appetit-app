module.exports = {
  project: {
    ios: {},
    android: {}, // grouped into "project"
  },
  assets: ['./path-to-assets'], // stays the same
  commands: require('./path-to-commands.js'), // formerly "plugin", returns an array of commands
};
