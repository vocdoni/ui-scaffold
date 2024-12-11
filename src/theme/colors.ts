export const colorsBase = {
  beige: '#D2CBB9',
  black: '#000000',
  blue: {
    normal: '#3965FF',
    grayish: '#1A202C',
    dark: '#0c0e12',
  },
  gradient: 'linear-gradient(to right, #546E39, #2E441A)',
  gray: {
    light2: '#ffffff3d',
    light: '#CBD5E0',
    normal: '#718096',
  },
  green: '#00FF00',
  orange: '#FFA500',
  primary: '#546E39',
  primary_dark: 'rgba(84, 110, 57, 0.2)',
  white: {
    pure: '#ffffff',
    dark: '#F5F5F7',
    alpha: 'whiteAlpha.300',
    from_read_more: 'rgba(245, 245, 247, 0)',
  },
  yellow: '#FFB116',
}

export const colors = {
  account_create_text_secondary: colorsBase.gray.normal,
  alert: {
    bg: {
      light: colorsBase.white.pure,
      dark: colorsBase.blue.dark,
    },
    border: colorsBase.gray.light,
    error: colorsBase.green,
    info: colorsBase.gray.normal,
    success: colorsBase.green,
    warning: colorsBase.orange,
    box_shadow_light: colorsBase.white.pure,
    box_shadow_dark: colorsBase.blue.dark,
  },
  auth: {
    textColorSecondary: colorsBase.gray.normal,
  },
  bg: {
    light: colorsBase.white.dark,
    dark: colorsBase.blue.dark,
  },
  contents: {
    bg: {
      light: colorsBase.white.pure,
      dark: colorsBase.blue.grayish,
    },
    color: {
      light: colorsBase.black,
      dark: colorsBase.white.pure,
    },
  },
  dashboard: {
    bg: {
      light: colorsBase.white.dark,
      dark: colorsBase.blue.dark,
    },
    color: {
      light: colorsBase.black,
      dark: colorsBase.white.pure,
    },
    invite: {
      bg_checked_light: colorsBase.white.dark,
      bg_checked_dark: colorsBase.blue.dark,
    },
    read_more: {
      from: colorsBase.white.from_read_more,
      to: {
        light: colorsBase.white.pure,
        dark: colorsBase.blue.grayish,
      },
    },
    sidebar: {
      bg: {
        light: colorsBase.white.pure,
        dark: colorsBase.blue.grayish,
      },
    },
  },
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
      bg: {
        light: colorsBase.primary,
        dark: colorsBase.primary_dark,
      },
      helper: colorsBase.white.pure,
      title: colorsBase.yellow,
    },
    description: {
      light: colorsBase.gray.normal,
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

  google: {
    bg: {
      light: colorsBase.gray.light,
      dark: colorsBase.blue.grayish,
    },
    hover: {
      light: colorsBase.white.pure,
      dark: colorsBase.white.alpha,
    },
    active: {
      light: colorsBase.gray.light,
      dark: colorsBase.blue.grayish,
    },
  },
  input: {
    bg: {
      light: colorsBase.white.pure,
      dark: colorsBase.blue.grayish,
    },
    border: {
      dark: colorsBase.white,
      light: colorsBase.gray.light2,
    },
    disabled: colorsBase.gray.normal,
    hover: {
      dark: colorsBase.white,
      light: colorsBase.gray.light2,
    },
    outline: colorsBase.blue.normal,
    placeholder: colorsBase.gray.normal,
  },
  org_text_secondary: colorsBase.gray.normal,

  process: {
    aside: {
      bg: colorsBase.gradient,
      color: colorsBase.white.pure,
      vote_btn_color: colorsBase.black,
      vote_btn_bg: colorsBase.primary,
      verify_link: colorsBase.white.pure,
    },
    canceled: colorsBase.primary,
    card_hover: {
      light: colorsBase.white.dark,
      dark: colorsBase.blue.dark,
    },
    info_title: colorsBase.primary,
    label: colorsBase.gray.normal,
    questions: {
      alert: {
        bg: colorsBase.primary,
        color: colorsBase.white.pure,
        link_color: colorsBase.black,
        link_bg: colorsBase.white.pure,
      },
      question_selected: {
        bg: colorsBase.primary,
        color: colorsBase.white.pure,
      },
      hover: {
        light: colorsBase.white.pure,
        dark: colorsBase.blue.grayish,
      },
      disabled: {
        light: colorsBase.white.pure,
        dark: colorsBase.blue.grayish,
      },
      title: {
        ligth: colorsBase.primary,
        dark: colorsBase.white.pure,
      },
    },
    paused: colorsBase.primary,
    results: {
      alert_bg: colorsBase.primary,
      alert_color: colorsBase.white.pure,
      bg: colorsBase.gray.light,
      description: colorsBase.gray.normal,
      progressbar_bg: colorsBase.gray.light,
      title: colorsBase.primary,
    },
    tabs: {
      active_bg: colorsBase.gray.light,
      hover_bg: colorsBase.gray.light,
      border_bottom_list: colorsBase.gray.light,
    },
  },

  process_create: {
    bg: {
      dark: colorsBase.blue.dark,
      light: colorsBase.white.dark,
    },
    bg_secondary: {
      dark: colorsBase.blue.grayish,
      light: colorsBase.white.pure,
    },
    stepper: {
      bg: colorsBase.primary,
      color: colorsBase.primary,
    },
    calendar_bg: {
      dark: colorsBase.blue.grayish,
      light: colorsBase.white.pure,
    },
    text_brand: colorsBase.primary,
    text_secondary: colorsBase.gray.normal,
    question_index: colorsBase.primary,
  },
  pricing_card: {
    bg: {
      light: colorsBase.white.pure,
      dark: colorsBase.blue.grayish,
    },
    border_dark: colorsBase.white.pure,
    body_text: colorsBase.black,
    most_popular_plan: {
      bg: colorsBase.beige,
      color: colorsBase.black,
    },
    subtitle: {
      light: colorsBase.gray.normal,
      dark: colorsBase.gray.light,
    },
  },
  pricing_modal: {
    bg: {
      light: colorsBase.primary,
      dark: colorsBase.blue.dark,
    },
  },
  process_view: {
    bg_light: colorsBase.white.dark,
    bg_dark: colorsBase.blue.dark,
  },
  read_more: {
    from: colorsBase.white.from_read_more,
    to: {
      light: colorsBase.white.dark,
      dark: colorsBase.blue.dark,
    },
  },
  tab: {
    variant: {
      card: {
        badge_bg: colorsBase.primary,
        bg: {
          light: colorsBase.white.pure,
          dark: colorsBase.blue.grayish,
        },
        border: colorsBase.gray.normal,
        description: {
          light: colorsBase.gray.normal,
          dark: colorsBase.white.pure,
        },
        svg: colorsBase.primary,
      },
    },
  },
  radio: {
    bg: colorsBase.primary,
    border: colorsBase.primary,
  },

  text_area: {
    bg_light: colorsBase.white.pure,
    bg_dark: colorsBase.blue.grayish,
  },
  verify_subtitle: colorsBase.gray.light,

  wrapper: {
    bg_light: colorsBase.white.pure,
    bg_dark: colorsBase.blue.grayish,
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
