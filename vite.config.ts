import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      dts: "src/types/components.d.ts",
      resolvers: [AntDesignVueResolver({ importStyle: false })],
    }),
    AutoImport({
      dts: "src/types/auto-imports.d.ts",
      imports: ["vue", "vue-router"],
    }),
  ],
});
