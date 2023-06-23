export const colorsBase = {
  black: '#000000',
  blue: {
    light2: '#F2F5FF',
    light: '#B8CEF9',
    normal: '#0044FF',
    dark: '#002266',
  },
  gray: {
    light: '#FAFAFA',
    light2: '#F2F2F2',
    normal: '#D9D9D9',
    dark: '#718096',
    dark2: 'rgba(0, 0, 0, 0.6)',
  },
  grenade: '#961D1D',
  lightpurple: '#EDE4F4',
  pink: {
    ultralight: '#EA7BDF',
    light: '#E55BD8',
    normal: '#E035D0',
  },
  purple: '#892BE2',
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
      process_image: colorsBase.blue.normal,
    },
  },
  footer_links: colorsBase.black,
  home: {
    bg: colorsBase.blue.light2,
  },

  input_search: {
    bg: colorsBase.white,
    border: colorsBase.black,
  },
  link: colorsBase.pink.normal,
  navbar: {
    bg: colorsBase.white,
    border: colorsBase.white,
    border_bottom: colorsBase.gray.light,
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

  process_create: {
    alert_info: {
      color: colorsBase.blue.dark,
      bg: colorsBase.blue.light,
    },

    aside_questions_bg: colorsBase.gray.light2,
    bg: colorsBase.gray.light,
    border: colorsBase.gray.normal,
    description_logo: colorsBase.blue.normal,
    input_bg: colorsBase.white,
    tabs: {
      card: {
        color: colorsBase.gray.dark,
        color_title: colorsBase.gray.dark2,
        selected_color: colorsBase.pink.normal,
      },
    },
  },

  text_error: colorsBase.grenade,
}
