import { ChakraStylesConfig } from 'chakra-react-select'

export const customStylesSelect: ChakraStylesConfig = {
  control: (base) => ({
    ...base,
    p: 0,
  }),
  placeholder: (base) => ({
    ...base,
    color: 'dropdown.placeholder',
  }),
  menu: (base) => ({
    ...base,
    zIndex: 10,
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
  }),
  option: (base, state) => ({
    ...base,
    bgColor: state.isSelected && 'input.dropdown.option_bg_selected.light',
    color: 'input.dropdown.option.light',
    icon: state.isSelected && 'PONER UN ICON DE CHECK AQUI',

    _dark: {
      bgColor: state.isSelected && 'input.dropdown.option_bg_selected.dark',
      color: 'dropdown.option.dark',
    },
  }),
  dropdownIndicator: (base) => ({
    ...base,
    bgColor: 'transparent',
    color: 'input.dropdown.control',
  }),
  clearIndicator: (base) => ({
    ...base,
    bgColor: 'transparent',
    color: 'input.dropdown.control',
  }),
}

export const customStylesTokensSelect: ChakraStylesConfig = {
  ...customStylesSelect,
}
