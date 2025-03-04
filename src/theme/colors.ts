export const colorsBase = {
  beige: '#D2CBB9',
  black: {
    grayish: '#2f2e30',
    dark: '#1a191b',
    pure: '#000000',
  },
  blue: {
    light: '#63b3ed',
    normal: '#3965ff',
  },
  gradient: 'linear-gradient(to right, #2E855B, #22555A)',
  gradientBottom: 'linear-gradient(to bottom, #2E855B, #22555A)',
  gray: {
    light: '#CBD5E0',
    normal: '#A0AEC0',
    dark: '#4A5568',
    dark2: '#333',
  },
  green: '#c6f6d5',
  orange: '#FFA500',
  primary: '#22555A',
  primary_cta: 'linear-gradient(to bottom, #2C7D57, #22555A)',
  primary_dark: 'rgba(84, 110, 57, 0.2)',
  red: '#FC8181',
  white: {
    pure: '#ffffff',
    light: '#fcfcfc',
    light2: '#ffffff3d',
    dark: '#F5F5F7',
    dark2: '#EDF2F7',
    alpha: 'whiteAlpha.300',
    from_read_more: 'rgba(245, 245, 247, 0)',
  },
  yellow: '#FFB116',
  btn: {
    dark_color: '#CBD5E0',
    dark_color_secondary: '#22262f',
  },
}

export const colors = {
  account_create_text_secondary: colorsBase.gray.dark,
  alert: {
    bg: {
      light: colorsBase.white.pure,
      dark: colorsBase.black.grayish,
    },
    color: {
      light: colorsBase.black.pure,
      dark: colorsBase.white.pure,
    },
    border: colorsBase.gray.light,
    error: colorsBase.red,
    info: colorsBase.gray.normal,
    success: colorsBase.green,
    warning: colorsBase.orange,
    box_shadow_light: colorsBase.white.pure,
    box_shadow_dark: colorsBase.black.dark,
  },
  auth: {
    banner_bg: colorsBase.primary_cta,
    textColorSecondary: colorsBase.gray.normal,
  },
  banner_link: colorsBase.white.pure,
  bg: {
    light: colorsBase.white.dark,
    dark: colorsBase.black.dark,
  },
  button: {
    variant: {
      primary: {
        color: colorsBase.white.pure,
        disabled: {
          light: {
            bg: '#EDF2F7',
            border: '#E2E8F0',
            color: '#A0AEC0',
          },
          dark: {
            bg: colorsBase.btn.dark_color_secondary,
            border: colorsBase.btn.dark_color,
            color: colorsBase.btn.dark_color,
          },
        },
      },
      common: {
        bg: {
          dark: '#13161b',
          light: colorsBase.white.pure,
        },
        border_color: {
          dark: '#373a41',
          light: '#d5d7da',
        },
        color: {
          dark: '#cecfd2',
          light: '#414651',
        },
        hover: {
          bg: {
            dark: '#22262f',
            light: '#f6f6f6',
          },
        },
        disabled: {
          color: {
            light: '#4A5568',
            dark: '#e9eaeb',
          },
          border: '#CBD5E0',
        },
      },

      outline: {
        color: colorsBase.white.pure,
        bg: {
          dark: '#13161b',
          light: '#000',
        },
      },
    },
    dark: {
      primary: '#7f56d9',
      secondary: '#6941c6',
    },
  },
  checkbox: {
    bg_checked: colorsBase.primary,
    disabled_border: colorsBase.gray.normal,
    detailed: {
      border: colorsBase.gray.light,
    },
    radiobox_control: colorsBase.white.light2,
    disabled: {
      light: 'gray.300',
      dark: 'gray.600',
    },
  },
  comparsions_table_title: colorsBase.primary,
  contents: {
    bg: {
      light: colorsBase.white.pure,
      dark: colorsBase.black.grayish,
    },
    color: {
      light: colorsBase.black.pure,
      dark: colorsBase.white.pure,
    },
  },
  dashboard: {
    bg: {
      light: colorsBase.white.dark,
      dark: colorsBase.black.dark,
    },
    color: {
      light: colorsBase.black.pure,
      dark: colorsBase.white.pure,
    },
    invite: {
      bg_checked_light: colorsBase.white.dark,
      bg_checked_dark: colorsBase.black.grayish,
    },
    process_view: {
      calendar_label: colorsBase.gray.normal,
      link: colorsBase.blue.normal,
    },
    read_more: {
      from: colorsBase.white.from_read_more,
      to: {
        light: colorsBase.white.pure,
        dark: colorsBase.black.grayish,
      },
      text: {
        light: colorsBase.primary,
        dark: colorsBase.white.pure,
      },
    },
    sidebar: {
      bg: {
        light: colorsBase.white.pure,
        dark: colorsBase.black.grayish,
      },
    },
  },
  home: {
    benefits: {
      bg: {
        light: {
          white: colorsBase.white.pure,
          primary: colorsBase.gradient,
        },
        dark: {
          primary: colorsBase.gradient,
          dark: colorsBase.black.grayish,
        },
      },
      color: {
        light: {
          bg_white: colorsBase.black.pure,
          bg_primary: colorsBase.white.pure,
        },
        dark: colorsBase.white.pure,
      },
    },
    features_icon: colorsBase.gradient,
    step: {
      icon: colorsBase.white.pure,
      icon_bg: colorsBase.gradient,
    },
    solutions: {
      light_bg: colorsBase.white.pure,
      dark_bg: colorsBase.black.grayish,
    },
    support: {
      bg: {
        light: colorsBase.gradientBottom,
        dark: colorsBase.gradientBottom,
      },
      helper: colorsBase.white.pure,
      title: colorsBase.yellow,
    },
    description: {
      light: colorsBase.gray.dark2,
      dark: colorsBase.white.pure,
    },
    footer: {
      icon: {
        light: colorsBase.black.pure,
      },
    },
  },

  google: {
    bg: {
      light: colorsBase.white.light2,
      dark: colorsBase.black.grayish,
    },
    hover: {
      light: colorsBase.white.pure,
      dark: colorsBase.white.alpha,
    },
    active: {
      light: colorsBase.white.light2,
      dark: colorsBase.black.grayish,
    },
  },
  input: {
    bg: {
      light: colorsBase.white.pure,
      dark: 'transparent',
    },
    calendar_border: colorsBase.gray.light,
    border: colorsBase.white.light2,
    element: colorsBase.gray.normal,
    error: colorsBase.red,
    drag_and_drop: {
      border: colorsBase.gray.light,
      border_active: colorsBase.primary,
      text: colorsBase.primary,
    },
    dropdown: {
      check_icon: colorsBase.primary,
      control: colorsBase.gray.normal,
      option_dark: colorsBase.white.pure,
      option_light_selected: colorsBase.black.pure,
      option_bg_selected: {
        light: colorsBase.white.dark,
        dark: colorsBase.black.dark,
      },
      placeholder: colorsBase.gray.normal,
    },
    outline: {
      light: colorsBase.blue.normal,
      dark: colorsBase.blue.light,
    },
    required_asterisk: colorsBase.primary,
  },
  link: {
    light: colorsBase.gray.dark,
    dark: colorsBase.gray.normal,
  },
  org_text_secondary: colorsBase.gray.normal,

  process: {
    aside: {
      bg: colorsBase.gradient,
      color: colorsBase.white.pure,
      vote_btn_color: colorsBase.black.pure,
      vote_btn_bg: colorsBase.primary,
      verify_link: colorsBase.white.pure,
    },
    canceled: colorsBase.primary,
    card_hover: {
      light: colorsBase.white.dark,
      dark: colorsBase.black.dark,
    },
    info_title: {
      light: colorsBase.primary,
      dark: colorsBase.white.pure,
    },
    label: {
      light: colorsBase.gray.dark,
      dark: colorsBase.white.pure,
    },
    questions: {
      alert: {
        bg: colorsBase.primary,
        link_bg: colorsBase.white.pure,
      },
      question_selected: {
        bg: colorsBase.primary,
        color: colorsBase.white.pure,
      },
      hover: {
        light: colorsBase.white.pure,
        dark: colorsBase.black.grayish,
      },
      disabled: {
        light: colorsBase.white.pure,
        dark: colorsBase.black.grayish,
      },
    },
    paused: colorsBase.primary,
    read_more_dark: colorsBase.black.grayish,
    results: {
      alert_bg: colorsBase.primary,
      alert_color: colorsBase.white.pure,
      bg: colorsBase.white.light2,
      description: {
        light: colorsBase.gray.dark,
        dark: colorsBase.white.pure,
      },
      progressbar_bg: colorsBase.white.light2,
      title: {
        light: colorsBase.primary,
        dark: colorsBase.white.pure,
      },
    },
    tabs: {
      active_bg: colorsBase.white.light2,
      hover_bg: colorsBase.white.light2,
      border_bottom_list: colorsBase.white.light2,
    },
  },

  process_create: {
    bg: {
      dark: 'red',
      light: colorsBase.white.dark,
    },
    bg_secondary: {
      dark: colorsBase.black.grayish,
      light: colorsBase.white.pure,
    },
    stepper: {
      bg: colorsBase.primary,
      color: colorsBase.primary,
    },
    calendar_bg: {
      dark: colorsBase.black.grayish,
      light: colorsBase.white.pure,
    },
    text_brand: colorsBase.primary,
    text_secondary: colorsBase.gray.normal,
    question_index: colorsBase.primary,
    footer_link: colorsBase.gray.dark,
  },
  pricing_card: {
    bg: {
      light: colorsBase.white.pure,
      dark: colorsBase.black.grayish,
    },
    border_dark: colorsBase.white.pure,
    body_text: colorsBase.black.pure,
    most_popular_plan: {
      bg: colorsBase.beige,
      color: colorsBase.black.pure,
    },
    subtitle: {
      light: colorsBase.gray.normal,
      dark: colorsBase.white.light2,
    },
  },
  pricing_modal: {
    bg: {
      light: colorsBase.primary,
      dark: colorsBase.black.dark,
    },
  },
  process_view: {
    bg_light: colorsBase.white.dark,
    bg_dark: colorsBase.black.dark,
  },
  read_more: {
    from: colorsBase.white.from_read_more,
    to: {
      light: colorsBase.white.dark,
      dark: colorsBase.black.dark,
    },
  },
  tab: {
    variant: {
      card: {
        badge_bg: colorsBase.primary,
        bg: {
          light: colorsBase.white.pure,
          dark: colorsBase.black.grayish,
        },
        border: colorsBase.gray.normal,
        description: {
          light: colorsBase.gray.normal,
          dark: colorsBase.white.pure,
        },
        svg: colorsBase.primary,
      },
    },
    responsive_tab: {
      underline_border: colorsBase.gray.light,
    },
  },

  table: {
    bg: {
      light: colorsBase.white.light2,
      light_hover: colorsBase.white.dark,
      dark: colorsBase.black.grayish,
    },
    thead: {
      bg_light: colorsBase.white.light2,
      bg_dark: colorsBase.black.grayish,
    },
    variant: {
      striped: {
        light: {
          tr_even: colorsBase.white.pure,
          tr_odd: colorsBase.white.dark,
          hover: '#cce5de',
        },
        dark: {
          tr_even: colorsBase.black.grayish,
          tr_odd: colorsBase.black.dark,
          hover: '#193d32',
        },
      },
    },
  },

  radio: {
    bg: colorsBase.primary,
    border: colorsBase.primary,
    disabled: {
      light: 'gray.300',
      dark: 'gray.600',
    },
  },
  text_area_bg: colorsBase.white.pure,
  text_area: {
    toolbar_dark: {
      bg: '#232323',
      border: colorsBase.white.light2,
      item_hover: colorsBase.black.grayish,
    },
    bg_light: colorsBase.white.pure,
    bg_dark: 'transparent',
    border_dark: colorsBase.white.light2,
    placeholder: colorsBase.white.light2,
  },
  verify_subtitle: colorsBase.white.light2,

  wrapper: {
    bg_light: colorsBase.white.pure,
    bg_dark: colorsBase.black.grayish,
  },

  // brand: {
  //   50: '#9ebab1', // oultine light hover bg
  //   100: '#87a99e', // outline light active bg ----------- outline dark color and border color
  //   200: '#70998c', // primary dark mode bg
  //   300: '#59897a', // primary dark mode hover bg
  //   400: '#417969', // primary dark mode active bg
  //   500: '#276958', // primary light mode bg
  //   600: '#205345', // primary light mode hover bg  ------ outline light color and border color
  //   700: '#193d32', // primary light mode active bg
  //   800: 'rgba(112, 153, 140, 0.12)', //  oultine dark hover bg (use 200 in rgba and 0.12 transparency)
  //   900: 'rgba(112, 153, 140, 0.24)', //  oultine dark active bg (use 200 in rgba and 0.24 transparency)
  //   950: '',
  // },
  brand: {
    50: '#cce5de', // primary light color
    100: '#99cbbd', // primary light bg
    200: '#276958', // primary light bg hover
    300: '#33967c', // primary light active
    400: '#2b846b', // primary dark color
    500: '#276958', // primary dark bg
    600: '#205345', // primary dark bg hover
    700: '#193d32', // primary dark bg active
    800: '#12271f', // outline light color
    850: '#12271f', // outline light border
    950: '#050b07', // outline light bg hover
    1000: '#050b07', // outline light bg active
    1050: '#12271f', // outline dark color
    1100: '#12271f', // outline dark border
    1150: '#050b07', // outline dark bg hover
    1200: '#050b07', // outline dark bg active
  },
  brandAlpha: {
    50: '#d9e4c4',
    100: '#b3c77f',
    200: '#8db13a',
    300: '#749c2d',
    400: '#22555A',
    500: '#22555A',
    600: '#22555A',
    700: '#3a552b',
    800: '#2e4924',
    900: '#233c1d',
    950: '#1a2e16',
  },
  gradient: {
    50: '#2C7D57',
    100: '#2C7D57',
    200: 'linear-gradient(to right, #2C7D57, #22555A)', // gradient base
    300: 'linear-gradient(to right, #2C7D57, #2C7D57, #2C7D57, #22555A)',
    400: 'linear-gradient(to right, #2C7D57, #2C7D57)',
    500: 'linear-gradient(to right, #2C7D57, #22555A)', // gradient base
    600: 'linear-gradient(to right, #2C7D57, #2C7D57, #2C7D57, #22555A)',
    700: 'linear-gradient(to right, #2C7D57, #2C7D57)',
    800: '#2C7D57',
    900: '#2C7D57',
    950: '#2C7D57',
  },
}
