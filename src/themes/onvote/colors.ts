export const colorsBase = {
  black: '#000000',

  gray: {
    bg: '#f2f2f2',
    light2: '#D9E5FF',
    light: '#E2E8F0',
    main: '#CBD5E0',
    dark: '#606f88',
    dark2: '#595959',
  },
  green: '#48BB78',
  primary: {
    gray_light: '#b8bdc7',
    gray: '#656E81',
    light2: '#D9E5FF',
    light: '#3375ff',
    main: '#0053FF',
    dark: '#0042cc',
    dark2: '#003399',
  },

  red: '#E53E3E',
  white: {
    pure: '#ffffff',
    dark: '#fafafa',
    dark2: 'rgb(245, 247, 250)',
  },

  cta: {
    black: '#000000',
    purple: 'rgb(127, 86, 214)',
    blue: 'rgb(0, 0, 255)',
    gray: 'rgb(194, 194, 194)',
  },
}

export const colors = {
  button_disabled: {
    bg: colorsBase.primary.gray,
    color: colorsBase.primary.gray_light,
  },
  button_transparent_color: colorsBase.primary.main,

  primary: {
    main: colorsBase.primary.main,
    50: '#e3f2ff',
    100: '#c6e4ff',
    200: '#a9d6ff',
    300: '#8cc7ff',
    400: '#6fb9ff',
    500: colorsBase.primary.main,
    600: '#004ae6',
    700: '#003ecc',
    800: '#0033b3',
    900: '#002999',
    950: '#00154d',
  },

  bg: colorsBase.gray.bg,

  editor: {
    character_limit: colorsBase.gray.light,
  },

  error: colorsBase.red,
  success: colorsBase.green,

  checkbox: {
    selected: colorsBase.primary.main,
    selected_text: colorsBase.white.pure,
  },

  footer_icon: colorsBase.white.pure,
  home_description: colorsBase.gray.dark2,
  link: {
    contrast: colorsBase.white.pure,
    primary: colorsBase.primary.main,
  },

  modal_description: colorsBase.gray.dark,

  navbar_chevron: colorsBase.primary.main,

  organization: {
    card: {
      footer_bg: colorsBase.primary.light2,
      footer_color: colorsBase.primary.main,
    },
    election_list_empty_bg: colorsBase.gray.dark2,
    go_back_btn: colorsBase.primary.main,
  },

  process: {
    aside: {
      bg: colorsBase.white.pure,
      color: colorsBase.primary.main,
      vote_btn_color: colorsBase.black,
      vote_btn_bg: colorsBase.white.pure,
      aside_footer_mbl_border: colorsBase.white.dark,
    },
    canceled: colorsBase.primary.main,
    date: colorsBase.black,
    created_by: colorsBase.primary.main,
    confirm_vote: {
      active: colorsBase.primary.dark2,
      bg: colorsBase.primary.main,
      color: colorsBase.white.pure,
      hover: colorsBase.primary.dark,
    },
    gitcoin_card_checked: colorsBase.primary.main,
    info_title: colorsBase.primary.main,
    description: colorsBase.gray.dark,
    paused: colorsBase.primary.main,
    questions: {
      border: colorsBase.primary.gray_light,
      alert: {
        bg: colorsBase.primary.main,
        color: colorsBase.white.pure,
        link_color: colorsBase.black,
        link_bg: colorsBase.white.pure,
      },
      question_selected: {
        bg: colorsBase.primary.main,
        color: colorsBase.white.pure,
      },
      hover: colorsBase.gray.light2,
      description: colorsBase.gray.dark,
      title: colorsBase.primary.main,
    },
    results: {
      alert_bg: colorsBase.primary.light,
      alert_color: colorsBase.white.pure,
      bg: colorsBase.gray.light2,
      description: colorsBase.gray.dark,
      progressbar_bg: colorsBase.gray.light,
      title: colorsBase.primary.main,
    },
    spinner: colorsBase.primary.main,
    spreadsheet: {
      disconnect_bg: 'transparent',
      disconnect_color_desktop: colorsBase.gray.dark,
      disconnect_color_mbl: colorsBase.white.pure,
    },
    tabs: {
      active_bg: colorsBase.gray.main,
      hover_bg: colorsBase.gray.light,
      border_bottom_list: colorsBase.gray.main,
      selected_color: colorsBase.primary.main,
    },
  },

  process_create: {
    alert_info: {
      bg: colorsBase.primary.light2,
      color: colorsBase.primary.dark2,
    },
    advanced_checkbox_bg: colorsBase.white.pure,
    advanced_checkbox_border: colorsBase.primary.gray_light,
    bg: colorsBase.white.dark2,
    close_btn: colorsBase.primary.main,
    confirm_total_cost: colorsBase.primary.main,
    creation_process_steps_loading: colorsBase.primary.gray,
    gitcoin_sybil: colorsBase.primary.main,
    wallet_addresses_border: colorsBase.gray.main,
    calendar_start_date_selected: colorsBase.primary.main,
    census: {
      drag_and_drop_border: colorsBase.gray.main,
      title: colorsBase.primary.main,
      weighted_vote_checked: colorsBase.primary.main,
      web3_owner_label: colorsBase.primary.main,
    },
    description: colorsBase.gray.dark,
    description_logo: colorsBase.primary.main,
    modal_pro: {
      description: colorsBase.gray.dark,
      border: colorsBase.primary.gray_light,
    },
    preview_option_question_before: colorsBase.black,
    preview_negative_balance: colorsBase.red,
    pro_bg: colorsBase.primary.main,
    pro_color: colorsBase.white.pure,
    section: colorsBase.white.pure,
    section_border: colorsBase.primary.gray_light,
    spreadsheet: {
      badge: {
        bg: colorsBase.primary.main,
        text: colorsBase.white.pure,
      },
      file: colorsBase.primary.main,
      preview_bg: colorsBase.white.pure,
      preview_bg_interior: colorsBase.gray.light2,
      requirements_text: colorsBase.primary.main,
      total_rows_text: colorsBase.primary.main,
    },
    stepper: {
      color: colorsBase.gray.dark,
      bg: colorsBase.primary.main,
      color_active: colorsBase.primary.main,
    },

    tabs_selected_color: colorsBase.primary.main,
    title: colorsBase.primary.main,
  },
  read_more: colorsBase.primary.main,
  results_progressbar_bg: colorsBase.white.pure,
  web3_cta: {
    onvote: colorsBase.cta.black,
    farcaster: colorsBase.cta.purple,
    plugins: colorsBase.cta.blue,
    others: colorsBase.cta.gray,
  },
}
