export const colorsBase = {
  primary: {
    normal: '#00624F',
    dark: '#003128',
  },
  black: '#000000',
  blue: {
    alert: '#35CCC0',
    light: '#80a2ff',
    dark: '#0044FF',
  },
  gray: {
    light: '#E2E8F0',
    normal: '#D9D9D9',
    dark: '#A0AEC0',
  },
  grenade: '#961D1D',
  green: {
    normal: '#00DAAE',
    dark: '#00dac0',
    ultradark: '#00dad2',
  },
  lightpurple: '#EDE4F4',
  pink: {
    ultralight: '#EA7BDF',
    light: '#E55BD8',
    normal: '#E035D0',
  },
  purple: '#8E00FF',
  turquoise: '#52E4C2',
  white: '#ffffff',
}
export const colors = {
  buttons: {
    ghost_hover_color: colorsBase.white,
    search: colorsBase.black,
  },

  card: {
    bg: colorsBase.white,
    description: colorsBase.gray.dark,
    footer_divider: colorsBase.gray.normal,
    footer_title: colorsBase.primary.normal,
    process_canceled: colorsBase.grenade,
    process_info: colorsBase.purple,
    title: colorsBase.black,
    date: colorsBase.primary.normal,

    detailed: {
      footer: colorsBase.gray.light,
      btn_disabled: colorsBase.grenade,
    },
  },
  error_link: colorsBase.blue.dark,
  footer: {
    divider: colorsBase.black,
    code_bg: colorsBase.white,
  },

  input_search: {
    bg: colorsBase.white,
    border: colorsBase.black,
  },

  navbar: {
    bg: colorsBase.white,
    border: colorsBase.white,
    border_bottom: colorsBase.gray.light,
    btn: {
      500: 'transparent',
      600: colorsBase.gray.light,
      700: colorsBase.gray.normal,
    },
    btn_list: {
      hover: colorsBase.gray.light,
      active: colorsBase.gray.normal,
    },
    btn_create: {
      500: 'var(--vcd-gradient-brand)',
      600: 'var(--vcd-gradient-brand-hover)',
      700: 'var(--vcd-gradient-brand-active)',
    },
  },
  organization: {
    button_address: {
      500: colorsBase.primary.normal,
      600: colorsBase.primary.dark,
      700: colorsBase.primary.dark,
    },
    election_list_empty: {
      bg: colorsBase.gray.light,
      border: colorsBase.gray.normal,
    },
    header_text: colorsBase.gray.dark,
    link: colorsBase.pink.normal,
    read_more: colorsBase.pink.normal,
    tabs_bg: colorsBase.white,
  },

  process: {
    bar: colorsBase.gray.normal,
    bar_progress: colorsBase.blue.dark,
    date: colorsBase.primary.normal,
    description: colorsBase.gray.dark,
    header: {
      btn_bg: colorsBase.white,
      btn_color: colorsBase.black,
      divider: colorsBase.gray.normal,
    },
    info: colorsBase.blue.dark,
    paused: colorsBase.grenade,
    vote_btn: colorsBase.black,

    questions: {
      alert: {
        bg: colorsBase.primary.normal,
        color: colorsBase.white,
        link_color: colorsBase.black,
        link_bg: colorsBase.white,
      },

      btn_form_selected: {
        bg: colorsBase.primary.normal,
        color: colorsBase.white,
      },
      description: colorsBase.gray.dark,
    },

    results: {
      alert_bg: colorsBase.primary.normal,
      alert_color: colorsBase.white,
    },
  },

  progress_bar: colorsBase.blue.dark,

  tabs: {
    color: colorsBase.black,
    divider: colorsBase.gray.normal,
    hover: colorsBase.gray.light,
    active: colorsBase.gray.dark,
    circle_bg: colorsBase.primary.normal,
  },

  text_error: colorsBase.grenade,
}
