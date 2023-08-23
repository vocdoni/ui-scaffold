export const colorsBase = {
  black: '#000000',
  blue: {
    light: '#B8CEF9',
    main: '#0044FF',
    dark: '#002266',
  },
  gradient: 'var(--vcd-gradient-primary)',
  gray: {
    light: '#EDF2F7',
    light2: '#fefefe',
    light3: '#f1f1f1',
    main: '#E2E8F0',
    dark: '#CBD5E0',
    dark2: '#677680',
  },
  primary: {
    light: '#24656e',
    main: '#175b64',
    dark: '#2c545a',
  },
  white: {
    pure: '#ffffff',
    dark: '#fafafa',
  },
}
export const colors = {
  aside_bg: colorsBase.gradient,

  primary: {
    main: colorsBase.primary.main,
    500: colorsBase.primary.main,
    600: colorsBase.primary.light,
    700: colorsBase.primary.dark,
  },

  button: {
    drop_down: {
      active: colorsBase.gray.dark,
      hover: colorsBase.gray.main,
    },
  },

  checkbox_radiobox_bg: colorsBase.white.pure,

  card: {
    description: colorsBase.gray.dark2,
    footer_divider: colorsBase.gray.dark,
    footer_title: colorsBase.primary.dark,
    header: colorsBase.primary.main,
  },

  home: {
    banner: {
      bg: colorsBase.gradient,
      button_bg: colorsBase.gradient,
      color: colorsBase.white.pure,
    },
    counter: colorsBase.gradient,
  },

  language_selected_bg: colorsBase.gray.dark,

  link: colorsBase.primary.main,

  main_bg: colorsBase.white.dark,

  navbar: {
    account_icon: colorsBase.gradient,
  },

  organization: {
    card_detailed: {
      footer_bg: colorsBase.gray.light2,
      footer_border: colorsBase.gray.light3,
    },
    election_list_empty_bg: colorsBase.gray.light,
    header: colorsBase.white.pure,
    tabs: {
      active: colorsBase.gray.dark,
      bg: colorsBase.white.pure,
      circle_bg: colorsBase.primary.main,
      divider: colorsBase.gray.dark,
      hover: colorsBase.gray.main,
      list_border_bottom: colorsBase.gray.dark,
    },
  },

  process: {
    canceled: colorsBase.primary.main,
    info_title: colorsBase.primary.main,
    description: colorsBase.gray.dark2,
    header_divider: colorsBase.gray.dark,
    identify_button_bg: colorsBase.primary.main,
    identify_button_color: colorsBase.white.pure,
    paused: colorsBase.primary.main,
    questions: {
      bg: colorsBase.gray.light,
      alert: {
        bg: colorsBase.primary.main,
        color: colorsBase.white.pure,
        link_color: colorsBase.black,
        link_bg: colorsBase.white.pure,
      },
      btn_form_selected: {
        bg: colorsBase.primary.main,
        color: colorsBase.white.pure,
      },
      description: colorsBase.gray.dark2,
      title: colorsBase.primary.main,
    },

    results: {
      aside: {
        color: colorsBase.white.pure,
        vote_btn_color: colorsBase.black,
        vote_btn_bg: colorsBase.white.pure,
      },
      alert_bg: colorsBase.primary.main,
      alert_color: colorsBase.white.pure,
      bg: colorsBase.gray.light,
      description: colorsBase.gray.dark2,
      title: colorsBase.primary.main,
    },

    tabs: {
      active: colorsBase.gray.dark,
      divider: colorsBase.gray.dark,
      circle_bg: colorsBase.primary.main,
      hover: colorsBase.gray.main,
      list_border_bottom: colorsBase.gray.dark,
    },
  },

  process_create: {
    alert_info: {
      bg: colorsBase.blue.light,
      color: colorsBase.blue.dark,
    },
    aside_questions_bg: colorsBase.gray.light,
    bg: colorsBase.gray.light,
    preview: {
      census_web3_text_helper: colorsBase.gray.dark2,
      description: colorsBase.gray.dark2,
      option: colorsBase.gray.dark2,
      option_before_color: colorsBase.black,
    },
    border: colorsBase.gray.dark,
    census_box_bg: colorsBase.white.pure,
    description_logo: colorsBase.blue.main,
    input_bg: colorsBase.white.pure,
    meta_description: colorsBase.gray.dark2,
    stepper: colorsBase.primary.main,
    spreadsheet: {
      badge: {
        bg: colorsBase.primary.main,
        text: colorsBase.white.pure,
      },
      drag_and_drop_text: colorsBase.gray.dark2,
      file: colorsBase.primary.main,
      preview_bg: colorsBase.white.pure,
      preview_bg_interior: colorsBase.gray.light,
      requirements_text: colorsBase.primary.main,
      total_rows_text: colorsBase.primary.main,
    },
    tabs: {
      card: {
        color: colorsBase.gray.dark2,
        color_title: colorsBase.gray.dark2,
        selected_color: colorsBase.primary.main,
      },
    },
  },

  progress_bar: {
    bg: colorsBase.gray.main,
    track: colorsBase.gradient,
  },

  spreadsheet: {
    disconnect_bg: 'transparent',
    diconnect_color: colorsBase.gray.dark2,
  },
}
