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
    default: colorsBase.pink.light,
    primary: {
      50: colorsBase.pink.normal,
      100: colorsBase.pink.light,
      500: colorsBase.pink.normal,
      600: colorsBase.pink.ultralight,
      700: colorsBase.pink.light,
    },
    ghost_hover_color: colorsBase.white,
  },

  card: {
    bg: colorsBase.white,
    title: colorsBase.black,
    description: colorsBase.gray.normal,
    process_canceled: colorsBase.grenade,
    footer_divider: colorsBase.gray.light,

    variant: {
      process_info: colorsBase.purple,
      process_description: colorsBase.turquoise,
      process_image: colorsBase.blue,
    },
  },
  footer_links: colorsBase.black,

  input_search: {
    bg: colorsBase.white,
    border: colorsBase.black,
  },
  link: colorsBase.pink.normal,
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
    button_address_active: colorsBase.white,
    link: colorsBase.pink.normal,
    read_more: colorsBase.pink.normal,
  },

  pink: {
    50: colorsBase.pink.normal,
    600: colorsBase.pink.ultralight,
  },

  process: {
    canceled: colorsBase.grenade,
    date: colorsBase.purple,
    secret_until_the_end: colorsBase.purple,
  },

  text_error: colorsBase.grenade,
}
