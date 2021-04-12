const path = require("path");

module.exports = {
  require: [
    path.join(__dirname, "src/settings.css"),
    path.join(__dirname, "src/index.css"),
  ],
  skipComponentsWithoutExample: true,
  theme: {
    color: {
      base: "#ffffff",
      baseBackground: "#575253",
      sidebarBackground: "#ea407b",
      border: "#6f7271",
    },
  },
};
