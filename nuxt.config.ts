import path from "node:path";
import vuetify from "vite-plugin-vuetify";

const plusJakartaSansHref =
  "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400..800&display=swap";
const bootstrapIconsHref =
  "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css";

const purgecss =
  process.env.NODE_ENV === "production"
    ? {
        "@fullhuman/postcss-purgecss": {
          content: [
            "./app/**/*.vue",
            "./app/**/*.ts",
            "./app/**/*.js",
          ],
          defaultExtractor(content: string) {
            const withoutStyles = content.replace(/<style[^]+?<\/style>/gi, "");
            return withoutStyles.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || [];
          },
          safelist: {
            standard: [
              /^v-/,
              /^nuxt/,
              /^router/,
              /^ps-/,
              /^page-/,
              /^carousel/,
              /^swiper/,
              /^apexcharts/,
              /^Vue-Toastification/,
              /-(enter|leave|appear)(|-(to|from|active))$/,
              /^(?!cursor-move).+-move$/,
              "show",
              "fade",
              "collapse",
              "collapsing",
              "active",
              "disabled",
              "modal-backdrop",
              "modal-open",
            ],
            deep: [/^v-/, /^carousel/, /^swiper/],
          },
        },
      }
    : {};

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  devtools: { enabled: true },

  app: {
    head: {
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "preload",
          as: "style",
          href: plusJakartaSansHref,
          onload: "this.onload=null;this.rel='stylesheet'",
        },
        { rel: "preconnect", href: "https://cdn.jsdelivr.net" },
        {
          rel: "preload",
          as: "style",
          href: bootstrapIconsHref,
          onload: "this.onload=null;this.rel='stylesheet'",
        },
      ],
    },
  },

  modules: [
    "@nuxt/image",
    "@pinia/nuxt",
    "vue3-perfect-scrollbar/nuxt",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        config.plugins?.push(
          vuetify({
            autoImport: true,
            styles: {
              configFile: path.resolve(__dirname, "app/assets/scss/_variables.scss"),
            },
          })
        );
      });
    },
  ],

  alias: {
    "@": path.resolve(__dirname, "app"),
    "~": path.resolve(__dirname, "app"),
  },

  build: {
    transpile: ["vuetify", "vue-toastification"],
  },

  css: ["@/assets/scss/bootstrap-lite.scss", "@/assets/global.css"],

  postcss: {
    plugins: {
      ...purgecss,
    },
  },

  vite: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "app"),
        "~": path.resolve(__dirname, "app"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ["import", "if-function", "global-builtin", "color-functions"],
        },
      },
    },
    optimizeDeps: {
      include: [
        "@vue/devtools-core",
        "@vue/devtools-kit",
        "pinia-plugin-persistedstate",
        "swiper/vue",
        "vuedraggable",
        "axios",
        "@devindex/vue-mask",
        "@mdi/js",
        "bootstrap/dist/js/bootstrap.bundle.min.js",
      ],
    },
    ssr: {
      noExternal: ["vuetify", "vue3-carousel"],
    },
  },

  nitro: {
    alias: {
      "@": path.resolve(__dirname, "app"),
      "~": path.resolve(__dirname, "app"),
    },
  },
});
