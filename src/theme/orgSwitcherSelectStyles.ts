import { ChakraStylesConfig } from 'chakra-react-select'

export const orgSwitcherSelectStyles: ChakraStylesConfig = {
  container: (base) => ({
    ...base,
    w: 'full',
  }),
  control: (base) => ({
    ...base,
    p: 0,
  }),
  option: (base, state) => ({
    ...base,
    bgColor: state.isSelected && 'switcher_account.option_selected_bg',
    color: state.isSelected && 'switcher_account.option_selected_color',
    _dark: {
      bgColor: state.isSelected && 'switcher_account.option_selected_bg',
    },
  }),
}
