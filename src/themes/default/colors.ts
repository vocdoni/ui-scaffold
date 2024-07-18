export const colorsBase = {
  black: '#000000',
  blue: {
    light: '#B8CEF9',
    main: '#0044FF',
    dark: '#002266',
  },
  gradient: 'var(--vcd-gradient-primary)',
  gray: {
    light2: '#EDF2F7',
    light: '#E2E8F0',
    main: '#CBD5E0',
    dark: '#606f88',
    dark2: '#000000a1',
  },
  green: '#48BB78',
  primary: '#24656e',
  red: '#E53E3E',
  white: {
    pure: '#ffffff',
    dark: '#fafafa',
    dark2: '#F5F7FA',
  },
  yellow: '#FFB116',
}

export const colors = {
  primary: {
    main: colorsBase.primary,
    50: '#e6f2f3',
    100: '#c1e0e3',
    200: '#9bcdd3',
    300: '#75b8c1',
    400: '#4ea3af',
    500: colorsBase.primary,
    600: '#205c63',
    700: '#1b5257',
    800: '#17484c',
    900: '#123d40',
    950: '#0a2223',
  },

  avatar: {
    bg: colorsBase.primary,
    color: colorsBase.white.pure,
  },

  checkbox: {
    selected: colorsBase.primary,
    selected_text: colorsBase.white.pure,
  },

  dashboard_card_text: colorsBase.gray.dark,

  editor: {
    character_limit: colorsBase.gray.light,
  },

  error: colorsBase.red,

  footer: {
    white: colorsBase.white.pure,
    gray: colorsBase.white.dark2,
  },
  home: {
    benefits: {
      dark_bg: colorsBase.primary,
      dark_bg_color: colorsBase.white.pure,
      light_bg: colorsBase.white.pure,
      light_bg_color: colorsBase.black,
    },
    demo: {
      icon: colorsBase.gray.dark,
      radio: colorsBase.primary,
    },
    description: colorsBase.gray.dark2,
    icon_bg: colorsBase.primary,
    section: {
      bg: colorsBase.gray.light,
      title: colorsBase.primary,
    },
    support: {
      bg: colorsBase.primary,
      title: colorsBase.yellow,
      helper: colorsBase.white.pure,
    },
    step: {
      icon: colorsBase.white.pure,
      icon_bg: colorsBase.primary,
      title: colorsBase.primary,
    },
    trusted_title: colorsBase.gray.dark,
  },
  dashboard: {
    org_name: colorsBase.primary,
  },
  success: colorsBase.green,

  link: {
    primary: colorsBase.primary,
    contrast: colorsBase.white.pure,
  },

  modal_description: colorsBase.gray.dark,

  navbar_chevron: colorsBase.primary,

  organization: {
    card: {
      footer_bg: colorsBase.gray.light2,
    },
    election_list_empty_bg: colorsBase.gray.dark,
  },

  process: {
    aside: {
      bg: colorsBase.gradient,
      color: colorsBase.white.pure,
      vote_btn_color: colorsBase.black,
      vote_btn_bg: colorsBase.primary,
      aside_footer_mbl_border: colorsBase.white.dark,
      verify_link: colorsBase.white.pure,
    },
    canceled: colorsBase.primary,
    confirm_vote: {
      bg: colorsBase.primary,
      color: colorsBase.white.pure,
    },
    gitcoin_card_checked: colorsBase.primary,
    info_title: colorsBase.primary,
    description: colorsBase.gray.dark,

    label: colorsBase.gray.dark,
    paused: colorsBase.primary,
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
      hover: colorsBase.gray.light2,
      description: colorsBase.gray.dark,
      title: colorsBase.primary,
    },
    no_description: colorsBase.gray.dark,
    results: {
      alert_bg: colorsBase.primary,
      alert_color: colorsBase.white.pure,
      bg: colorsBase.gray.light2,
      description: colorsBase.gray.dark,
      progressbar_bg: colorsBase.gray.light,
      title: colorsBase.primary,
    },
    spinner: colorsBase.primary,
    spreadsheet: {
      disconnect_bg: 'transparent',
      disconnect_color_desktop: colorsBase.gray.dark,
      disconnect_color_mbl: colorsBase.white.pure,
    },
    tabs: {
      active_bg: colorsBase.gray.main,
      hover_bg: colorsBase.gray.light,
      border_bottom_list: colorsBase.gray.main,
    },
    vote_button: {
      mobile_bg: colorsBase.white.pure,
      mobile_color: colorsBase.black,
      desktop_bg: colorsBase.primary,
      desktop_color: colorsBase.white.pure,
    },
  },

  process_create: {
    alert_info: {
      bg: colorsBase.blue.light,
      color: colorsBase.blue.dark,
    },
    advanced_checkbox_bg: colorsBase.white.pure,
    pro_bg: colorsBase.primary,
    pro_color: colorsBase.white.pure,
    bg: colorsBase.white.dark2,
    wallet_addresses_border: colorsBase.gray.main,
    calendar_start_date_selected: colorsBase.blue.main,
    census: {
      drag_and_drop_border: colorsBase.gray.main,
      title: colorsBase.primary,
      weighted_vote_checked: colorsBase.primary,
      web3_owner_label: colorsBase.primary,
    },
    description: colorsBase.gray.dark,
    description_logo: colorsBase.blue.main,
    modal_pro: {
      description: colorsBase.gray.dark,
      border: colorsBase.gray.light,
    },
    preview_option_question_before: colorsBase.black,
    preview_negative_balance: colorsBase.red,
    section: colorsBase.white.pure,
    spreadsheet: {
      badge: {
        bg: colorsBase.primary,
        text: colorsBase.white.pure,
      },
      file: colorsBase.primary,
      preview_bg: colorsBase.white.pure,
      preview_bg_interior: colorsBase.gray.light2,
      requirements_text: colorsBase.primary,
      total_rows_text: colorsBase.primary,
    },
    stepper: {
      color: colorsBase.gray.dark,
      bg: colorsBase.primary,
      color_active: colorsBase.white.pure,
    },
  },
  read_more: colorsBase.primary,
}
