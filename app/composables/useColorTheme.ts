import { useTheme } from "vuetify";
import {
  DEFAULT_COLOR_THEME,
  THEME_CSS_VARIABLES,
  type ColorThemeName,
} from "@/theme/LightTheme";

const STORAGE_KEY = "casa-bonita-color-theme";

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

export function useColorTheme() {
  const theme = useTheme();

  const setColorTheme = (themeName: ColorThemeName) => {
    theme.global.name.value = themeName;
    applyThemeVariables(themeName);

    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, themeName);
    }
  };

  const loadColorTheme = () => {
    if (!import.meta.client) return;

    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme && isColorThemeName(savedTheme)) {
      setColorTheme(savedTheme);
      return;
    }

    const currentTheme = theme.global.name.value;
    setColorTheme(isColorThemeName(currentTheme) ? currentTheme : DEFAULT_COLOR_THEME);
  };

  return {
    colorTheme: theme.global.name,
    themes: Object.keys(THEME_CSS_VARIABLES) as ColorThemeName[],
    setColorTheme,
    loadColorTheme,
  };
}
