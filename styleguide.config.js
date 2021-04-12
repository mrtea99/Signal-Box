const path = require("path");

module.exports = {
  require: [path.join(__dirname, "src/settings.css")],
  skipComponentsWithoutExample: true,
  theme: {
    color: {
      base: "#ffffff",
      baseBackground: "#373737",
      sidebarBackground: "#575253",
    },
  },
};
