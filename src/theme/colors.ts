export const colorsBase = {
  black: '#000000',
  blue: {
    alert: '#35CCC0',
    light: '#80a2ff',
    normal: '#F8F8F8',
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
    footer_title: colorsBase.purple,
    process_canceled: colorsBase.grenade,
    process_info: colorsBase.purple,
    title: colorsBase.black,
    date: colorsBase.blue.dark,

    detailed: {
      footer: colorsBase.gray.light,
      btn_disabled: colorsBase.grenade,
    },
  },

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
    btn_create: {
      500: colorsBase.green.normal,
      600: colorsBase.green.dark,
      700: colorsBase.green.ultradark,
    },
  },
  organization: {
    button_address: {
      active: colorsBase.white,
      bg: colorsBase.blue.dark,
      color: colorsBase.white,
    },
    election_list_empty: {
      bg: colorsBase.gray.light,
      border: colorsBase.gray.normal,
    },
    header_text: colorsBase.gray.dark,
    link: colorsBase.pink.normal,
    read_more: colorsBase.pink.normal,
  },

  process: {
    bar: colorsBase.gray.normal,
    bar_progress: colorsBase.blue.dark,
    date: colorsBase.blue.dark,
    description: colorsBase.gray.dark,
    header: {
      btn_bg: colorsBase.white,
      btn_color: colorsBase.black,
      divider: colorsBase.gray.normal,
    },
    info: colorsBase.blue.dark,
    paused: colorsBase.grenade,
    vote_btn: colorsBase.black,
    btn_form_selected: {
      bg: colorsBase.green.normal,
      color: colorsBase.white,
    },
  },

  progress_bar: colorsBase.blue.dark,

  questions: {
    alert: {
      bg: colorsBase.blue.alert,
      color: colorsBase.white,
      link_color: colorsBase.black,
      link_bg: colorsBase.white,
    },

    description: colorsBase.gray.dark,
  },

  results: {
    bg: colorsBase.blue.alert,
    color: colorsBase.white,
  },

  tabs: {
    color: colorsBase.black,
    divider: colorsBase.gray.normal,
    hover: colorsBase.gray.light,
    active: colorsBase.gray.dark,
  },

  text_error: colorsBase.grenade,
}
