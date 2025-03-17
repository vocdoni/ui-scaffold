import { ChakraStylesConfig } from 'chakra-react-select'

export const reactSelectStyles: ChakraStylesConfig = {
  control: (base) => ({
    ...base,
    p: 0,
  }),
  placeholder: (base) => ({
    ...base,
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

    bgColor: state.isSelected && 'transparent',
    color: state.isSelected && 'black',
    fontWeight: state.isSelected && '600',

    _dark: {
      bgColor: state.isSelected && 'transparent',
      color: state.isSelected && 'white',
      fontWeight: state.isSelected && '600',
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
