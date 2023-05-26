export const colorsBase = {
  primary: {
    normal: '#00624F',
    dark: '#0D4752',
  },
  black: '#000000',
  blue: '#0044FF',
  gray: {
    light: '#F5F7FA',
    normal: '#E2E8F0',
    dark: '#A7A7A7',
  },

  grenade: '#961D1D',
  pink: {
    normal: '#E035D0',
  },
  purple: '#8E00FF',
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
    footer_divider: colorsBase.gray.dark,
    footer_title: colorsBase.primary.normal,
    process_info: colorsBase.purple,
    date: colorsBase.primary.normal,

    detailed: {
      footer: colorsBase.gray.normal,
      btn_disabled: colorsBase.grenade,
    },
  },
  error_link: colorsBase.blue,

  input_search: {
    bg: colorsBase.white,
    border: colorsBase.black,
  },

  navbar: {
    bg: colorsBase.white,
    btn: {
      500: 'transparent',
      600: colorsBase.gray.normal,
      700: colorsBase.gray.dark,
    },
    btn_list: {
      hover: colorsBase.gray.normal,
      active: colorsBase.gray.dark,
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
      bg: colorsBase.gray.normal,
      border: colorsBase.gray.dark,
    },
    tabs_bg: colorsBase.white,
  },

  process: {
    date: colorsBase.primary.normal,
    description: colorsBase.gray.dark,
    header: {
      btn_bg: colorsBase.white,
      btn_color: colorsBase.black,
      divider: colorsBase.gray.normal,
    },

    paused: colorsBase.grenade,

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
      bg: colorsBase.gray.light,
      alert_bg: colorsBase.primary.normal,
      alert_color: colorsBase.white,
      title: colorsBase.primary.dark,
    },
  },

  progress_bar_bg: colorsBase.gray.normal,

  tabs: {
    color: colorsBase.black,
    divider: colorsBase.gray.normal,
    hover: colorsBase.gray.normal,
    active: colorsBase.gray.dark,
    circle_bg: colorsBase.primary.normal,
  },
}
