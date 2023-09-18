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
  },
  primary: {
    main: '#24656e',
    dark: '#175b64',
    dark2: '#2c545a',
  },
  white: {
    pure: '#ffffff',
    dark: '#fafafa',
    dark2: 'rgb(245, 247, 250)',
  },
}

export const colors = {
  primary: {
    main: colorsBase.primary.main,
    50: colorsBase.white.pure,
    500: colorsBase.primary.main,
    600: colorsBase.primary.dark,
    700: colorsBase.primary.dark2,
  },

  link: {
    primary: colorsBase.primary.main,
  },

  main_bg: colorsBase.white.dark,

  organization: {
    card: {
      description: colorsBase.gray.dark,
      footer_bg: colorsBase.gray.light2,
    },
    election_list_empty_bg: colorsBase.gray.light2,
    header_bg: colorsBase.white.pure,
  },

  process: {
    aside: {
      bg: colorsBase.gradient,
      color: colorsBase.white.pure,
      vote_btn_color: colorsBase.black,
      vote_btn_bg: colorsBase.white.pure,
    },
    canceled: colorsBase.primary.main,
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
      diconnect_color: colorsBase.gray.dark,
    },
    tabs: {
      active_bg: colorsBase.gray.main,
      hover_bg: colorsBase.gray.light,
      border_bottom_list: colorsBase.gray.main,
    },
  },

  process_create: {
    alert_info: {
      bg: colorsBase.blue.light,
      color: colorsBase.blue.dark,
    },
    aside_questions_bg: colorsBase.gray.light2,
    bg: colorsBase.white.dark2,
    calendar_start_date_selected: colorsBase.blue.main,
    checkbox_radiobox_bg: colorsBase.white.pure,
    preview: {
      census_web3_text_helper: colorsBase.gray.dark,
      description: colorsBase.gray.dark,
      option: colorsBase.gray.dark,
      option_before_color: colorsBase.black,
    },
    border: colorsBase.gray.main,
    census_box_bg: colorsBase.white.pure,
    description_logo: colorsBase.blue.main,
    input_bg: colorsBase.white.pure,
    description: colorsBase.gray.dark,
    section: colorsBase.white.pure,
    stepper: {
      bg: colorsBase.primary.main,
      color_active: colorsBase.white.pure,
    },

    spreadsheet: {
      badge: {
        bg: colorsBase.primary.main,
        text: colorsBase.white.pure,
      },
      drag_and_drop_text: colorsBase.gray.dark,
      file: colorsBase.primary.main,
      preview_bg: colorsBase.white.pure,
      preview_bg_interior: colorsBase.gray.light2,
      requirements_text: colorsBase.primary.main,
      total_rows_text: colorsBase.primary.main,
    },
    tabs: {
      card: {
        color: colorsBase.gray.dark,
        color_title: colorsBase.gray.dark,
        selected_color: colorsBase.primary.main,
      },
    },
  },
}
