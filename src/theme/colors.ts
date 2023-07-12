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
    main: '#E2E8F0',
    dark: '#CBD5E0',
    dark2: '#718096',
  },
  primary: {
    light: '#24656e',
    main: '#175b64',
    dark: '#2c545a',
  },
  white: '#ffffff',
}
export const colors = {
  aside_bg: colorsBase.gradient,

  primary: {
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

  checkbox_radiobox_bg: colorsBase.white,

  card: {
    description: colorsBase.gray.dark2,
    footer_divider: colorsBase.gray.dark,
    footer_title: colorsBase.primary.main,
    header: colorsBase.primary.main,
  },

  home: {
    banner: {
      bg: colorsBase.gradient,
      button_bg: colorsBase.gradient,
      color: colorsBase.white,
    },
    counter: colorsBase.gradient,
  },

  language_selected_bg: colorsBase.gray.dark,

  link: colorsBase.primary.main,

  navbar: {
    account_icon: colorsBase.gradient,
    bg: colorsBase.white,
  },

  organization: {
    election_list_empty_bg: colorsBase.gray.light,

    tabs: {
      active: colorsBase.gray.dark,
      bg: colorsBase.white,
      circle_bg: colorsBase.primary.main,
      divider: colorsBase.gray.dark,
      hover: colorsBase.gray.main,
      list_border_bottom: colorsBase.gray.dark,
    },
  },

  process: {
    canceled: colorsBase.primary.main,
    date: colorsBase.primary.main,
    description: colorsBase.gray.dark2,
    header_divider: colorsBase.gray.dark,
    paused: colorsBase.primary.main,
    questions: {
      bg: colorsBase.gray.light,
      alert: {
        bg: colorsBase.primary.main,
        color: colorsBase.white,
        link_color: colorsBase.black,
        link_bg: colorsBase.white,
      },
      btn_form_selected: {
        bg: colorsBase.primary.main,
        color: colorsBase.white,
      },
      description: colorsBase.gray.dark2,
      title: colorsBase.primary.main,
    },

    results: {
      aside: {
        color: colorsBase.white,
        verify_color: colorsBase.black,
        vote_btn_color: colorsBase.black,
      },
      alert_bg: colorsBase.primary.main,
      alert_color: colorsBase.white,
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
    census_box_bg: colorsBase.white,
    description_logo: colorsBase.blue.main,
    input_bg: colorsBase.white,
    meta_description: colorsBase.gray.dark2,
    stepper: colorsBase.primary.main,
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
}
