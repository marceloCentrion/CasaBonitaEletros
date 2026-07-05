import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import {
  mdiWhiteBalanceSunny,
  mdiCloud,
  mdiAlert,
  mdiWeatherHurricane,
  mdiWeatherWindy,
  mdiWeatherPouring,
  mdiDotsVertical,
  mdiTwitter,
  mdiHeart,
  mdiShareVariant,
  mdiMessage,
  mdiBrightness1,
} from "@mdi/js";
import "../assets/scss/style.scss";

import {
  BLUE_THEME,
  DEFAULT_COLOR_THEME,
  RED_THEME,
  THEME_CSS_VARIABLES,
  type ColorThemeName,
} from "../theme/LightTheme";

function isColorThemeName(theme: string): theme is ColorThemeName {
  return theme in THEME_CSS_VARIABLES;
}

function applyThemeVariables(themeName: ColorThemeName) {
  if (!import.meta.client) return;

  const colors = THEME_CSS_VARIABLES[themeName];
  const root = document.documentElement;

  root.dataset.colorTheme = themeName;
  root.style.setProperty("--primary", colors.primary);
  root.style.setProperty("--primary-darken-1", colors.primaryDarken1);
  root.style.setProperty("--selection", colors.selection);
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const configuredTheme = String(config.public.colorTheme || DEFAULT_COLOR_THEME);
  const defaultTheme = isColorThemeName(configuredTheme)
    ? configuredTheme
    : DEFAULT_COLOR_THEME;

  const vuetify = createVuetify({
    icons: {
      defaultSet: "mdi",
      aliases: {
        ...aliases,
        whiteBalanceSunny: mdiWhiteBalanceSunny,
        cloud: mdiCloud,
        alert: mdiAlert,
        weatherHurricane: mdiWeatherHurricane,
        weatherWindy: mdiWeatherWindy,
        weatherPouring: mdiWeatherPouring,
        dotsVertical: mdiDotsVertical,
        twitter: mdiTwitter,
        heart: mdiHeart,
        shareVariant: mdiShareVariant,
        message: mdiMessage,
        brightness1: mdiBrightness1,
      },
      sets: { mdi },
    },
    theme: {
      defaultTheme,
      themes: {
        BLUE_THEME,
        RED_THEME,
      },
    },
    defaults: {
      VCard: {
        rounded: "md",
      },
      VTextField: {
        variant: "outlined",
        density: "comfortable",
        color: "primary",
      },
      VTextarea: {
        variant: "outlined",
        density: "comfortable",
        color: "primary",
      },
      VSelect: {
        variant: "outlined",
        density: "comfortable",
        color: "primary",
      },
      VListItem: {
        minHeight: "45px",
      },
      VTooltip: {
        location: "top",
      },
    },
  });

  applyThemeVariables(defaultTheme);
  nuxtApp.vueApp.use(vuetify);
});
