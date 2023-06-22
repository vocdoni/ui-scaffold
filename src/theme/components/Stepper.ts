const baseStyle = {
  separator: {
    marginTop: 2,
    '&[data-status=complete]': {
      background: 'process_create.stepper',
    },
  },
  indicator: {
    '&[data-status=complete]': {
      background: 'process_create.stepper',
    },
    '&[data-status=active]': {
      borderColor: 'process_create.stepper',
    },
  },
}

export const Stepper = {
  baseStyle,
}
