export const colorsBase = {
  black: '#000000',
  blue: '#0044FF',
  gray: {
    light: '#F5F5F5',
    normal: '#D9D9D9',
    dark: '#949494',
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
    top_header: colorsBase.blue,
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
      bg: colorsBase.blue,
      color: colorsBase.white,
    },
    election_list_empty: {
      bg: colorsBase.gray.light,
      border: colorsBase.gray.normal,
    },
    header_text: colorsBase.gray.dark,
    link: colorsBase.pink.normal,
    read_more: colorsBase.pink.normal,
    tabs: {
      bg: colorsBase.white,
      color: colorsBase.black,
      divider: colorsBase.gray.normal,
    },
  },

  process: {
    bar: colorsBase.gray.normal,
    bar_progress: colorsBase.blue,
    date: colorsBase.blue,
    description: colorsBase.gray.dark,
    header: {
      btn_desktop_bg: colorsBase.white,
      btn_desktop_color: colorsBase.black,
      btn_mobile_bg: colorsBase.blue,
      btn_mobile_color: colorsBase.white,
    },
    header_divider: colorsBase.gray.normal,
    info: colorsBase.blue,
    paused: colorsBase.grenade,
    secret_until_the_end: colorsBase.purple,
    vote_btn: colorsBase.black,

    btn_form_select: colorsBase.gray.normal,

    tabs: {
      color: colorsBase.black,
      divider: colorsBase.gray.normal,
    },
  },

  text_error: colorsBase.grenade,
}
