export const colorsBase = {
  beige: '#D2CBB9',
  black: {
    grayish: '#2f2e30',
    dark: '#1a191b',
  },
  blue: {
    light: '#3182ce',
    dark: '#63b3ed',
  },
  gradient: 'linear-gradient(to right, #9cd594, #3b6930)',
  gray: {
    blue: '#e2e8f0',
    light: '#CBD5E0',
    normal: '#A0AEC0',
    dark: '#4A5568',
  },
  green: {
    light: '#3b6930',
    dark: '#9cd594',
  },
  orange: {
    light: '#FFA500',
    dark: '#F6AD55',
  },
  primary: {
    light: '#3b6930',
    dark: '#9cd594',
  },
  red: {
    light: '#E53E3E',
    dark: '#F56565',
  },
  white: {
    pure: '#ffffff',
    light: '#ffffff3d',
    dark: '#F5F5F7',
    alpha: 'whiteAlpha.300',
    from_read_more: 'rgba(245, 245, 247, 0)',
  },
  btn: {
    dark_color: '#CBD5E0',
    dark_color_secondary: '#22262f',
  },
}

export const colors = {
  alert: {
    bg: {
      light: colorsBase.white.pure,
      dark: colorsBase.black.grayish,
    },
    border: {
      light: colorsBase.gray.light,
      dark: colorsBase.white.light,
    },
    color: {
      light: colorsBase.black.dark,
      dark: colorsBase.white.pure,
    },
    error: {
      light: colorsBase.red.light,
      dark: colorsBase.red.dark,
    },
    info: {
      light: colorsBase.blue.light,
      dark: colorsBase.blue.dark,
    },
    success: {
      light: colorsBase.green.light,
      dark: colorsBase.green.dark,
    },
    warning: {
      light: colorsBase.orange.light,
      dark: colorsBase.orange.dark,
    },
  },
  auth_banner: {
    bg: colorsBase.gradient,
    link: colorsBase.white.pure,
  },
  bg: {
    light: colorsBase.white.dark,
    dark: colorsBase.black.dark,
  },
  contents: {
    bg: {
      light: colorsBase.white.pure,
      dark: colorsBase.black.grayish,
    },
    color: {
      light: colorsBase.black.dark,
      dark: colorsBase.white.pure,
    },
  },
  checkbox_detailed_border: {
    light: colorsBase.gray.light,
    dark: colorsBase.white.light,
  },
  input: {
    bg: {
      light: colorsBase.white.pure,
      dark: 'transparent',
    },
    border: {
      light: colorsBase.gray.light,
      dark: colorsBase.white.light,
    },
    drag_and_drop: {
      border: {
        light: colorsBase.gray.light,
        dark: colorsBase.white.light,
      },
      border_active: {
        light: colorsBase.primary.light,
        dark: colorsBase.primary.dark,
      },
      text: {
        light: colorsBase.primary.light,
        dark: colorsBase.primary.dark,
      },
    },
    dropdown: {
      check_icon: {
        light: colorsBase.primary.light,
        dark: colorsBase.primary.dark,
      },
      control: colorsBase.gray.normal,

      option_bg_selected: {
        light: colorsBase.white.dark,
        dark: colorsBase.black.dark,
      },
      placeholder: colorsBase.gray.normal,
    },
    element: colorsBase.gray.normal,
    error: {
      light: colorsBase.red.light,
      dark: colorsBase.red.dark,
    },
    outline: {
      light: colorsBase.blue.light,
      dark: colorsBase.blue.dark,
    },
    required_asterisk: {
      light: colorsBase.primary.light,
      dark: colorsBase.primary.dark,
    },
  },
  link: {
    light: colorsBase.gray.dark,
    dark: colorsBase.gray.normal,
  },
  text: {
    light: colorsBase.black.dark,
    dark: colorsBase.white.pure,
  },
  text_brand: {
    light: colorsBase.primary.light,
    dark: colorsBase.primary.dark,
  },
  text_secondary: {
    light: colorsBase.gray.dark,
    dark: colorsBase.gray.normal,
  },
  dashboard: {
    invite_bg_checked_: {
      light: colorsBase.white.dark,
      dark: colorsBase.black.grayish,
    },
    process_view: {
      calendar_label: colorsBase.gray.normal,
      link: colorsBase.blue.light,
    },
    read_more: {
      from: colorsBase.white.from_read_more,
      to: {
        light: colorsBase.white.pure,
        dark: colorsBase.black.grayish,
      },
      text: {
        light: colorsBase.black.dark,
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
          bg_white: colorsBase.black.dark,
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
        light: colorsBase.gradient,
        dark: colorsBase.gradient,
      },
      helper: colorsBase.white.pure,
      title: colorsBase.orange.dark,
    },
    description: {
      light: colorsBase.gray.dark,
      dark: colorsBase.white.pure,
    },
    footer: {
      icon: {
        light: colorsBase.black.dark,
      },
    },
  },
  link_hover_underline: {
    light: colorsBase.black.dark,
    dark: colorsBase.white.pure,
  },
  pricing_card: {
    bg: {
      light: colorsBase.white.pure,
      dark: colorsBase.black.grayish,
    },
    border_dark: colorsBase.white.pure,
    body_text: colorsBase.black.dark,
    most_popular_plan: {
      bg: colorsBase.beige,
      color: colorsBase.black.dark,
    },
    subtitle: {
      light: colorsBase.gray.normal,
      dark: colorsBase.white.light,
    },
  },
  pricing_modal_bg: {
    light: colorsBase.primary.light,
    dark: colorsBase.black.dark,
  },
  process: {
    canceled: {
      light: colorsBase.primary.light,
      dark: colorsBase.primary.dark,
    },
    card_hover: {
      light: colorsBase.white.dark,
      dark: colorsBase.black.dark,
    },
    info_title: {
      light: colorsBase.primary.light,
      dark: colorsBase.primary.dark,
    },
    label: {
      light: colorsBase.gray.dark,
      dark: colorsBase.white.pure,
    },
    questions: {
      alert: {
        bg: {
          light: colorsBase.primary.light,
          dark: colorsBase.primary.light,
        },
        link_bg: colorsBase.white.pure,
      },
      question_selected: {
        bg: {
          light: colorsBase.primary.light,
          dark: colorsBase.primary.dark,
        },
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
    paused: {
      light: colorsBase.primary.light,
      dark: colorsBase.primary.dark,
    },
    read_more_dark: colorsBase.black.grayish,
    results: {
      alert_bg: {
        light: colorsBase.primary.light,
        dark: colorsBase.primary.dark,
      },
      alert_color: colorsBase.white.pure,
      bg: colorsBase.white.light,
      description: {
        light: colorsBase.gray.dark,
        dark: colorsBase.white.pure,
      },
      progressbar_bg: colorsBase.white.light,
      title: {
        light: colorsBase.primary.light,
        dark: colorsBase.primary.dark,
      },
    },
    tabs: {
      active_bg: colorsBase.white.light,
      hover_bg: colorsBase.white.light,
      border_bottom_list: colorsBase.white.light,
    },
  },
  process_create: {
    calendar_alert_border: {
      light: colorsBase.gray.light,
      dark: colorsBase.white.light,
    },
    stepper: {
      bg: {
        light: colorsBase.primary.light,
        dark: colorsBase.primary.dark,
      },
      color: {
        light: colorsBase.primary.light,
        dark: colorsBase.primary.dark,
      },
      color_icon: {
        light: colorsBase.white.pure,
        dark: colorsBase.black.dark,
      },
    },

    question_index: {
      light: colorsBase.primary.light,
      dark: colorsBase.primary.dark,
    },
  },
  radio: {
    disabled: {
      light: 'gray.300',
      dark: 'gray.600',
    },
  },
  read_more: {
    from: colorsBase.white.from_read_more,
    to: {
      light: colorsBase.white.dark,
      dark: colorsBase.black.dark,
    },
  },
  tab_card: {
    bg: {
      light: colorsBase.white.pure,
      dark: colorsBase.black.grayish,
    },
    checkbox_border: colorsBase.gray.normal,
    svg: {
      light: colorsBase.primary.light,
      dark: colorsBase.primary.dark,
    },
  },
  tab_underline_border: colorsBase.gray.light,
  table: {
    bg: {
      light: colorsBase.white.light,
      light_hover: colorsBase.white.dark,
      dark: colorsBase.black.grayish,
    },
    thead: {
      bg_light: colorsBase.white.light,
      bg_dark: colorsBase.black.grayish,
    },
    variant: {
      striped: {
        light: {
          tr_even: colorsBase.white.pure,
          tr_odd: colorsBase.white.dark,
          hover: colorsBase.primary.light,
          hover_color: colorsBase.white.pure,
          icon_check: colorsBase.primary.light,
          icon_cross: colorsBase.red.light,
          icon_check_hover: colorsBase.green.dark,
          icon_cross_hover: colorsBase.red.dark,
        },
        dark: {
          tr_even: colorsBase.black.grayish,
          tr_odd: colorsBase.black.dark,
          hover: colorsBase.primary.dark,
          hover_color: colorsBase.black.dark,
          icon_check: colorsBase.primary.dark,
          icon_cross: colorsBase.red.dark,
          icon_check_hover: colorsBase.green.light,
          icon_cross_hover: colorsBase.red.dark,
        },
      },
    },
  },
  text_area: {
    toolbar_dark: {
      bg: '#232323',
      border: colorsBase.white.light,
      item_hover: colorsBase.black.grayish,
    },
    bg: {
      light: colorsBase.white.pure,
      dark: 'transparent',
    },
    border_dark: colorsBase.white.light,
    placeholder: colorsBase.white.light,
  },
  wrapper_bg: {
    light: colorsBase.white.pure,
    dark: colorsBase.black.grayish,
  },

  brand: {
    50: '#F0FFF4', // outline light hover bg
    100: '#C6F6D5', // outline light active bg
    200: '#9cd594', // primary dark mode bg ----------- outline dark color and border color
    300: '#95c98c', // primary dark mode hover bg
    400: '#8bbc83', // primary dark mode active bg
    500: '#3b6930', // primary light mode bg
    600: '#507846', // primary light mode hover bg  ------ outline light color and border color
    700: '#4f7445', // primary light mode active bg
    800: 'rgba(156, 213, 148, 0.12)', //  oultine dark hover bg (use 200 in rgba and 0.12 transparency)
    900: 'rgba(156, 213, 148, 0.24)', //  oultine dark active bg (use 200 in rgba and 0.24 transparency)
    950: '',
  },

  white: {
    50: 'rgba(245, 245, 247, 0.2)',
    100: 'rgba(245, 245, 247, 0.4)',
    200: 'white',
    300: 'white',
    400: 'white',
    500: 'white',
    600: 'white',
    700: 'white',
    800: 'rgba(245, 245, 247, 0.2)',
    900: 'rgba(245, 245, 247, 0.4)',
    950: '',
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
    200: 'linear-gradient(to right, #9cd594, #3b6930)', // gradient base
    300: 'linear-gradient(to right, #9cd594, #9cd594, #9cd594, #9cd594, #3b6930)',
    400: 'linear-gradient(to right, #9cd594, #9cd594)',
    500: 'linear-gradient(to right, #4f7445, #8bbc83)', // gradient base
    600: 'linear-gradient(to right, #4f7445, #4f7445, #4f7445, #4f7445, #8bbc83)',
    700: 'linear-gradient(to right, #4f7445, #4f7445)',
    800: '#2C7D57',
    900: '#2C7D57',
    950: '#2C7D57',
  },
}
