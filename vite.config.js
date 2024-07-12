import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src/*" },
      { find: "@pages", replacement: "/src/pages/index.jsx" },
      { find: "@modal", replacement: "/src/components/modal/index.jsx" },
      { find: "@service", replacement: "/src/service/index.js" },
      { find: "@validation", replacement: "/src/utils/validation.js" },
      { find: "@notification", replacement: "/src/utils/notification.js" },
      { find: "@ui", replacement: "/src/components/ui/index.jsx" },
    ],
  },
});
