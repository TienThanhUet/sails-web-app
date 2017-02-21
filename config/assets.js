/**
 * Created by smallmouse on 2/19/17.
 */
var normalize = require('normalize-path');

module.exports = {
  seed: true,
  paths: {
    public: __dirname + "/../assets",
    appdata: normalize(process.cwd() + "/data")
  }
};
