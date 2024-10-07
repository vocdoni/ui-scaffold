const baseStyle = {
  indicator: {
    '&[data-status=complete]': {
      background: 'text.brand',
    },
    '&[data-status=active]': {
      borderColor: 'text.brand',
      background: 'text.brand',
      color: 'white',
    },
  },
  separator: {
    marginTop: 2,
    '&[data-status=complete]': {
      background: 'text.brand',
    },
  },
  title: {
    mt: 1,
  },
}

export const Stepper = {
  baseStyle,
}
