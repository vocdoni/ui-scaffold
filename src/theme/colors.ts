export const colorsBase = {
  black: '#000000',
  blue: {
    light2: '#F2F5FF',
    light: '#B8CEF9',
    normal: '#0044FF',
    dark: '#002266',
  },
  brand: {
    light2: '#218491',
    light: '#1c727e',
    main: '#175b64',
  },
  gray: {
    light: '#FAFAFA',
    light2: '#F2F2F2',
    normal: '#D9D9D9',
    dark: '#718096',
    dark2: 'rgba(0, 0, 0, 0.6)',
  },
  grenade: '#961D1D',
  white: '#ffffff',
}

export const colors = {
  brand: {
    color: colorsBase.brand.main,
    scheme: {
      50: colorsBase.brand.light2,
      100: colorsBase.brand.light,
      500: colorsBase.brand.main,
      600: colorsBase.black,
      700: colorsBase.brand.light,
    },
  },

  card: {
    bg: colorsBase.white,
    title: colorsBase.black,
    description: colorsBase.gray.normal,
    process_canceled: colorsBase.grenade,
    footer_divider: colorsBase.gray.light,

    variant: {
      process_info: colorsBase.brand.main,
      process_description: colorsBase.brand.main,
      process_image: colorsBase.brand.main,
    },
  },

  home_bg: colorsBase.blue.light2,

  input_search: {
    bg: colorsBase.white,
    border: colorsBase.black,
  },
  navbar: {
    bg: colorsBase.white,
    border: colorsBase.white,
    border_bottom: colorsBase.gray.light,
  },
  organization: {
    button_address_active: colorsBase.white,
    link: colorsBase.brand.main,
    read_more: colorsBase.brand.main,
  },

  process_canceled: colorsBase.grenade,

  process_create: {
    alert_info: {
      color: colorsBase.blue.dark,
      bg: colorsBase.blue.light,
    },

    aside_questions_bg: colorsBase.gray.light2,
    bg: colorsBase.gray.light,
    border: colorsBase.gray.normal,
    census_box_bg: colorsBase.white,
    description_logo: colorsBase.blue.normal,
    input_bg: colorsBase.white,
    meta_description: colorsBase.gray.dark,
    stepper: colorsBase.brand.main,
    tabs: {
      card: {
        color: colorsBase.gray.dark,
        color_title: colorsBase.gray.dark2,
        selected_color: colorsBase.brand.main,
      },
    },
  },

  text_error: colorsBase.grenade,
}
