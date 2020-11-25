import React from "react";
import FormItem from "../../FormItem/FormItem";

function SiteSettings() {
  const [lang, setLang] = React.useState("en-us");

  return (
    <form>
      <FormItem
        type="toggleButton"
        label="Language:"
        ident="site-lang"
        itemLabels={["English", "Español"]}
        itemValues={["en-us", "es-mx"]}
        value={lang}
        updateHandler={setLang}
      />
    </form>
  );
}

export default SiteSettings;
