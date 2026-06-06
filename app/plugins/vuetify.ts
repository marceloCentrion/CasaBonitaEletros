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

import { BLUE_THEME } from "../theme/LightTheme";

export default defineNuxtPlugin((nuxtApp) => {
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
      defaultTheme: "BLUE_THEME",
      themes: {
        BLUE_THEME,
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
  nuxtApp.vueApp.use(vuetify);
});
