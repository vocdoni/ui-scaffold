export const colorsBase = {
  black: '#000000',
  blue: {
    light: '#d9e5ff',
    main: '#0053FF',
    dark: '#0042CC',
  },
  gray: {
    bg: '#f2f2f2',
    light2: '#EDF2F7',
    light: '#E2E8F0',
    main: '#CBD5E0',
    dark: '#606f88',
  },
  primary: {
    gray_light: '#b8bdc7',
    gray: '#656E81',
    light2: '#B2CCFF',
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
}

export const colors = {
  button: {
    black: colorsBase.black,
    color: colorsBase.white.pure,
    light2: colorsBase.primary.light2,
    light: colorsBase.primary.light,
    main: colorsBase.primary.main,
    dark: colorsBase.primary.dark,

    ghost: {
      bg: colorsBase.white.pure,
      border_active: colorsBase.primary.light2,
      color: colorsBase.primary.main,
      color_hover: colorsBase.primary.dark,
    },

    disabled: {
      bg: colorsBase.primary.gray,
      color: colorsBase.primary.gray_light,
    },
  },

  primary: {
    main: colorsBase.primary.main,
  },

  bg: colorsBase.gray.bg,

  checkbox: colorsBase.primary.main,

  link: {
    primary: colorsBase.primary.main,
  },

  main_bg: colorsBase.white.dark,

  modal_description: colorsBase.gray.dark,

  navbar_chevron: colorsBase.primary.main,

  organization: {
    card: {
      description: colorsBase.gray.dark,
      footer_bg: colorsBase.primary.light,
      footer_color: colorsBase.primary.main,
    },
    election_list_empty_bg: colorsBase.gray.light2,
    go_back_btn: colorsBase.primary.main,
    header_bg: colorsBase.white.pure,
  },

  process: {
    aside: {
      bg: colorsBase.primary.main,
      color: colorsBase.white.pure,
      vote_btn_color: colorsBase.black,
      vote_btn_bg: colorsBase.white.pure,
      aside_footer_mbl_border: colorsBase.white.dark,
    },
    canceled: colorsBase.primary.main,
    date: colorsBase.gray.dark,
    created_by: colorsBase.primary.main,
    confirm_vote: {
      active: colorsBase.primary.dark2,
      bg: colorsBase.primary.main,
      color: colorsBase.white.pure,
      hover: colorsBase.primary.dark,
    },
    info_title: colorsBase.primary.main,
    description: colorsBase.gray.dark,
    identify_btn: {
      bg: colorsBase.primary.main,
      bg_active: colorsBase.primary.dark2,
      bg_hover: colorsBase.primary.dark,
      color: colorsBase.white.pure,
    },
    paused: colorsBase.primary.main,
    questions: {
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
      description: colorsBase.gray.dark,
      title: colorsBase.primary.main,
    },
    results: {
      alert_bg: colorsBase.primary.main,
      alert_color: colorsBase.white.pure,
      bg: colorsBase.gray.light2,
      description: colorsBase.gray.dark,
      progressbar_bg: colorsBase.gray.light,
      title: colorsBase.primary.main,
    },
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
      bg: colorsBase.blue.light,
      color: colorsBase.blue.dark,
    },
    advanced_checkbox_bg: colorsBase.white.pure,
    bg: colorsBase.white.dark2,
    wallet_addresses_border: colorsBase.gray.main,
    calendar_start_date_selected: colorsBase.blue.main,
    census: {
      drag_and_drop_border: colorsBase.gray.main,
      title: colorsBase.primary.main,
      weighted_vote_checked: colorsBase.primary.main,
      web3_owner_label: colorsBase.primary.main,
    },
    description: colorsBase.gray.dark,
    description_logo: colorsBase.blue.main,
    preview_option_question_before: colorsBase.black,
    preview_negative_balance: colorsBase.red,
    section: colorsBase.white.pure,
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
      bg: colorsBase.primary.main,
      color_active: colorsBase.primary.main,
    },

    tabs_selected_color: colorsBase.primary.main,
  },
  results_progressbar_bg: colorsBase.white.pure,
}
