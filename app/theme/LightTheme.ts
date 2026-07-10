export const BLUE_THEME = {
  dark: false,
  colors: {
    background: '#F4F5FA',
    surface: '#FFFFFF',
    primary: '#07163C',
    'primary-darken-1': '#040d24',
    secondary: '#74788D',
    'secondary-darken-1': '#5C6180',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    borderColor: '#E0E0E0',
    inputBorder: '#ABABAB',
  },
};

export const RED_THEME = {
  dark: false,
  colors: {
    background: '#F4F5FA',
    surface: '#FFFFFF',
    primary: '#B8000A',
    'primary-darken-1': '#960008',
    secondary: '#74788D',
    'secondary-darken-1': '#5C6180',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    borderColor: '#E0E0E0',
    inputBorder: '#ABABAB',
  },
};

export const THEME_CSS_VARIABLES = {
  BLUE_THEME: {
    primary: '#07163c',
    primaryDarken1: '#040d24',
    selection: '#3a67ee',
  },
  RED_THEME: {
    primary: '#b8000a',
    primaryDarken1: '#960008',
    selection: '#b8000a',
  },
} as const;

export type ColorThemeName = keyof typeof THEME_CSS_VARIABLES;

export const DEFAULT_COLOR_THEME: ColorThemeName = 'RED_THEME';

