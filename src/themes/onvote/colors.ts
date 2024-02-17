export const colorsBase = {
  black: '#000000',

  gray: {
    bg: '#f2f2f2',
    light2: '#D9E5FF',
    light: '#E2E8F0',
    main: '#CBD5E0',
    dark: '#606f88',
  },
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
}

export const colors = {
  button_disabled: {
    bg: colorsBase.primary.gray,
    color: colorsBase.primary.gray_light,
  },

  primary: {
    main: colorsBase.primary.main,
    50: colorsBase.white.pure,
    500: colorsBase.primary.light2,
    600: colorsBase.primary.main,
    700: colorsBase.primary.dark2,
  },

  black: {
    50: colorsBase.white.pure,
    500: colorsBase.black,
    600: colorsBase.black,
    700: colorsBase.black,
  },

  bg: colorsBase.gray.bg,

  editor: {
    character_limit: colorsBase.gray.light,
  },

  error: colorsBase.red,

  checkbox: colorsBase.primary.main,

  footer_icon: colorsBase.white.pure,

  link: {
    contrast: colorsBase.white.pure,
    primary: colorsBase.primary.main,
  },

  main_bg: colorsBase.white.dark,

  modal_description: colorsBase.gray.dark,

  navbar_chevron: colorsBase.primary.main,

  organization: {
    card: {
      description: colorsBase.gray.dark,
      footer_bg: colorsBase.primary.light2,
      footer_color: colorsBase.primary.main,
    },
    election_list_empty_bg: colorsBase.gray.light2,
    go_back_btn: colorsBase.primary.main,
    header_bg: colorsBase.white.pure,
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
    preview_option_question_before: colorsBase.black,
    preview_negative_balance: colorsBase.red,
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
      bg: colorsBase.primary.main,
      color_active: colorsBase.primary.main,
    },

    tabs_selected_color: colorsBase.primary.main,
    title: colorsBase.primary.main,
  },
  results_progressbar_bg: colorsBase.white.pure,
}
