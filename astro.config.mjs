import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://maw.com",
  integrations: [react()],
  trailingSlash: "always",
  style: {
    sass: true,
  },
});

// en este archivo de configuracion tambien se agreagan de ser necesarias las
// configuraciones de los plugins que se utilicen en el proyecto (como react, vue, etc).
