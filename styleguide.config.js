const path = require("path");

module.exports = {
  require: [
    path.join(__dirname, "src/settings.css"),
    path.join(__dirname, "src/index.css"),
  ],
  skipComponentsWithoutExample: true,
  styleguideDir: "public/styleguide",
  theme: {
    color: {
      base: "#ffffff",
      link: "#ffffff",
      light: "#ffffff",
      baseBackground: "#575253",
      sidebarBackground: "#ea407b",
      border: "#6f7271",
    },
  },
  sections: [
    {
      name: "General",
      components: [
        "src/components/Button/Button.js",
        "src/components/Button/ButtonSpacer/ButtonSpacer.js",
        "src/components/Icon/Icon.js",
        "src/components/InfoPod/InfoPodItem/InfoPodItem.js",
        "src/components/DataList/DataList.js",
      ],
    },
    {
      name: "Form Elements",
      components: [
        "src/components/FormItem/FormItem.js",
        "src/components/FormItem/TemperatureField/TemperatureField.js",
        "src/components/FormItem/WeightField/WeightField.js",
      ],
    },
  ],
};
