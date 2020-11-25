import React from "react";
import FormItem from "../../FormItem/FormItem";

function SiteSettings() {
  const [lang, setLang] = React.useState("en-us");

  return (
    <form>
      {/* Language */}
      {lang}
      <FormItem
        type="toggleButton"
        label="Language:"
        ident="site-lang2"
        itemLabels={["English", "Español"]}
        itemValues={["en-us", "es-mx"]}
        value={lang}
        updateHandler={setLang}
      />
      <FormItem
        type="radioGroup"
        label="Language:"
        ident="site-lang"
        itemLabels={["English", "Español"]}
        itemValues={["en-us", "es-mx"]}
        value={lang}
        updateHandler={setLang}
      />
      {/* Units */}
      {/* Time Format */}
      {/* Theme */}
      {/* Simple mode */}
    </form>
  );
}

export default SiteSettings;
