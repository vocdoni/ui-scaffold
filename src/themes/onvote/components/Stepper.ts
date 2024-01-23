import checkIcon from '/assets/check-icon.svg'

const baseStyle = {
  indicator: {
    borderRadius: '0px',
    '&[data-status=complete]': {
      background: 'process_create.stepper.bg',
      bgImage: checkIcon,
      bgRepeat: 'no-repeat',
      bgPosition: 'center',
    },
    '&[data-status=active]': {
      borderColor: 'process_create.stepper.bg',
      color: 'process_create.stepper.color_active',
    },
  },
  separator: {
    marginTop: 2,
    '&[data-status=complete]': {
      background: 'process_create.stepper.bg',
    },
  },
  title: {
    mt: 1,
  },
}

export const Stepper = {
  baseStyle,
}
