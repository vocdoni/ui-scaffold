export const colorsBase = {
  black: '#000000',
  blue: {
    normal: '#3965FF',
    grayish: '#303B4D',
    dark: '#1A202C',
  },
  gray: {
    light: '#E2E8F0',
    normal: '#A0AEC0',
    dark: '#5A5B5B',
  },
  primary: '#546E39',
  white: {
    pure: '#ffffff',
    dark: '#F5F7FA',
  },
  yellow: '#FFB116',
}

export const colors = {
  home: {
    benefits: {
      bg: {
        light: {
          white: colorsBase.white.pure,
          primary: colorsBase.primary,
        },
        dark: {
          primary: colorsBase.primary,
          dark: colorsBase.blue.grayish,
        },
      },
      color: {
        light: {
          bg_white: colorsBase.black,
          bg_primary: colorsBase.white.pure,
        },
        dark: colorsBase.white.pure,
      },
    },
    features_icon: colorsBase.primary,
    step: {
      icon: colorsBase.white.pure,
      icon_bg: colorsBase.primary,
    },
    solutions: {
      light_bg: colorsBase.white.pure,
      dark_bg: colorsBase.blue.grayish,
    },
    support: {
      bg: colorsBase.primary,
      helper: colorsBase.white.pure,
      title: colorsBase.yellow,
    },
    description: {
      light: colorsBase.gray.dark,
      dark: colorsBase.white.pure,
    },
    footer: {
      icon: {
        light: colorsBase.black,
      },
    },
  },
  checkbox: {
    bg: colorsBase.primary,
    checked: {
      border: colorsBase.primary,
      bg: colorsBase.primary,
    },
    icon: colorsBase.white.pure,

    variant: {
      radiobox: {
        bg: {
          light: colorsBase.white.pure,
          dark: colorsBase.blue.grayish,
        },
      },
    },
  },

  input: {
    focus: colorsBase.blue,
    light: {
      bg: colorsBase.white.pure,
      border: colorsBase.gray.light,
      outline: colorsBase.gray.light,
    },
    dark: {
      bg: colorsBase.blue.grayish,
      border: colorsBase.white,
      outline: colorsBase.white,
    },
  },

  process_create: {
    bg: {
      light: colorsBase.white.dark,
      dark: colorsBase.blue.dark,
    },
    bg_secondary: {
      light: colorsBase.white.pure,
      dark: colorsBase.blue.grayish,
    },
    stepper: {
      color: colorsBase.primary,
      bg: colorsBase.primary,
    },

    text_brand: colorsBase.primary,
    text_secondary: colorsBase.gray.normal,
    question_index: colorsBase.primary,
  },

  tab: {
    variant: {
      card: {
        badge_bg: colorsBase.primary,
        bg: {
          light: colorsBase.white.pure,
          dark: colorsBase.blue.grayish,
        },
        border: colorsBase.gray.dark,
        description: colorsBase.gray.dark,
        svg: colorsBase.primary,
      },
    },
  },

  radio: {
    bg: colorsBase.primary,
    border: colorsBase.primary,
  },

  brand: {
    50: '#e5ecd8',
    100: '#cbd9b2',
    200: '#b1c68b',
    300: '#97b364',
    400: '#7d9f3d',
    500: '#4B702D',
    600: '#426429',
    700: '#395824',
    800: '#304c1f',
    900: '#273f1a',
    950: '#1d2f13',
  },
  brandScheme: {
    100: '#E9E3FF',
    200: '#7551FF',
    300: '#7551FF',
    400: '#7551FF',
    500: '#422AFB',
    600: '#3311DB',
    700: '#02044A',
    800: '#190793',
    900: '#02044A',
  },
  brandTabs: {
    100: '#E9E3FF',
    200: '#422AFB',
    300: '#422AFB',
    400: '#422AFB',
    500: '#422AFB',
    600: '#3311DB',
    700: '#02044A',
    800: '#190793',
    900: '#02044A',
  },
  secondaryGray: {
    100: '#E0E5F2',
    200: '#E1E9F8',
    300: '#F4F7FE',
    400: '#E9EDF7',
    500: '#8F9BBA',
    600: '#A3AED0',
    700: '#707EAE',
    800: '#707EAE',
    900: '#1B2559',
  },
  red: {
    100: '#FEEFEE',
    500: '#EE5D50',
    600: '#E31A1A',
  },
  blue: {
    50: '#EFF4FB',
    500: '#3965FF',
  },
  orange: {
    100: '#FFF6DA',
    500: '#FFB547',
  },
  green: {
    100: '#E6FAF5',
    500: '#01B574',
  },
  navy: {
    50: '#d0dcfb',
    100: '#aac0fe',
    200: '#a3b9f8',
    300: '#728fea',
    400: '#3652ba',
    500: '#1b3bbb',
    600: '#24388a',
    700: '#1B254B',
    800: '#111c44',
    900: '#0b1437',
  },
  gray: {
    100: '#FAFCFE',
  },
}
