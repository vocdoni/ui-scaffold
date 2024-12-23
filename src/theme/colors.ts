export const colorsBase = {
  beige: '#D2CBB9',
  black: '#000000',
  blue: {
    light: '#63b3ed',
    normal: '#3965ff',
    grayish: '#2B2A33',
    dark: '#1A202C',
    dark2: '#0C0E12',
  },
  gradient: 'linear-gradient(to right, #546E39, #2E441A)',
  gray: {
    light3: '#fafafa',
    light2: '#ffffff3d',
    light: '#CBD5E0',
    normal: '#A0AEC0',
  },
  green: '#00FF00',
  orange: '#FFA500',
  primary: '#546E39',
  primary_dark: 'rgba(84, 110, 57, 0.2)',
  red: '#FC8181',
  white: {
    pure: '#ffffff',
    dark: '#F5F5F7',
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
  banner_link: colorsBase.white.pure,
  bg: {
    light: colorsBase.white.dark,
    dark: colorsBase.blue.dark2,
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
    radiobox_control: colorsBase.gray.light2,
    disabled: {
      light: 'gray.300',
      dark: 'gray.600',
    },
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
      dark: colorsBase.blue.dark2,
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

  google: {
    bg: {
      light: colorsBase.gray.light2,
      dark: colorsBase.blue.grayish,
    },
    hover: {
      light: colorsBase.white.pure,
      dark: colorsBase.white.alpha,
    },
    active: {
      light: colorsBase.gray.light2,
      dark: colorsBase.blue.grayish,
    },
  },
  input: {
    bg: {
      light: colorsBase.white.pure,
      dark: 'transparent',
    },
    calendar_border: colorsBase.gray.light,
    border: colorsBase.gray.light2,
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
      option_light_selected: colorsBase.black,
      option_bg_selected: {
        light: colorsBase.white.dark,
        dark: colorsBase.blue.dark,
      },
      placeholder: colorsBase.gray.normal,
    },
    outline: {
      light: colorsBase.blue.normal,
      dark: colorsBase.blue.light,
    },
    required_asterisk: colorsBase.primary,
  },
  link: colorsBase.gray.normal,
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
    read_more_dark: colorsBase.blue.dark2,
    results: {
      alert_bg: colorsBase.primary,
      alert_color: colorsBase.white.pure,
      bg: colorsBase.gray.light2,
      description: colorsBase.gray.normal,
      progressbar_bg: colorsBase.gray.light2,
      title: colorsBase.primary,
    },
    tabs: {
      active_bg: colorsBase.gray.light2,
      hover_bg: colorsBase.gray.light2,
      border_bottom_list: colorsBase.gray.light2,
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
      dark: colorsBase.gray.light2,
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
    responsive_tab: {
      underline_border: colorsBase.gray.light,
    },
  },

  table: {
    bg: {
      light: colorsBase.white.pure,
      dark: colorsBase.blue.grayish,
    },
    thead: {
      bg_light: colorsBase.gray.light3,
      bg_dark: colorsBase.blue.grayish,
    },
    border_color: {
      light: colorsBase.gray.normal,
      dark: colorsBase.blue.dark,
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

  text_area: {
    toolbar_dark: {
      bg: '#232323',
      border: colorsBase.gray.light2,
      item_hover: colorsBase.blue.grayish,
    },
    bg_light: colorsBase.white.pure,
    bg_dark: 'transparent',
    border_dark: colorsBase.gray.light2,
    placeholder: colorsBase.gray.light2,
  },
  verify_subtitle: colorsBase.gray.light2,

  wrapper: {
    bg_light: colorsBase.white.pure,
    bg_dark: colorsBase.blue.grayish,
  },

  brand: {
    50: '#d9e4c4',
    100: '#b3c77f',
    200: '#8db13a',
    300: '#749c2d',
    400: '#617c29',
    500: '#546E39',
    600: '#476232',
    700: '#3a552b',
    800: '#2e4924',
    900: '#233c1d',
    950: '#1a2e16',
  },
  brandAlpha: {
    50: 'red',
    100: 'blue',
    200: 'white',
    300: '#1A202C',
    400: 'green',
    500: '#E5E5E7',
    600: '#2B2A33',
    700: 'orange',
    800: 'blue',
    900: 'white',
    950: 'black',
  },
}
