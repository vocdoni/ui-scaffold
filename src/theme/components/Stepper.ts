const baseStyle = {
  indicator: {
    '&[data-status=complete]': {
      background: 'process_create.stepper',
    },
    '&[data-status=active]': {
      borderColor: 'process_create.stepper',
    },
  },
  separator: {
    marginTop: 2,
    '&[data-status=complete]': {
      background: 'process_create.stepper',
    },
  },
  title: {
    mt: 1,
  },
}

export const Stepper = {
  baseStyle,
}
