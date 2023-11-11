import { ChakraStylesConfig } from 'chakra-react-select'

export const customStylesSelect: ChakraStylesConfig = {
  control: (base) => ({
    ...base,
    boxShadow: 'var(--box-shadow)',
    fontWeight: 'bold',
  }),
  placeholder: (base) => ({
    ...base,
    fontWeight: 'normal',
  }),
  menu: (base) => ({
    ...base,
    zIndex: 10,
    boxShadow: 'var(--box-shadow)',
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
  }),
  option: (base, state) => ({
    ...base,
    fontWeight: 'bold',
    bgColor: state.isSelected && 'primary.500',
    color: state.isFocused && !state.isSelected ? 'primary.500' : state.isSelected && 'white',
  }),
  groupHeading: (base) => ({
    ...base,
    fontSize: 'lg',
  }),
  dropdownIndicator: (base) => ({
    ...base,
    bgColor: 'transparent',
  }),
}

export const customStylesTokensSelect: ChakraStylesConfig = {
  ...customStylesSelect,
  option: (base, state) => ({
    ...base,
    fontWeight: 'bold',
    bgColor: state.isSelected && 'primary.500',
    color: state.isFocused && !state.isSelected ? 'primary.500' : state.isSelected && 'white',
    pl: 10,
  }),
}
