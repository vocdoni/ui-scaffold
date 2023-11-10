import { ChakraStylesConfig } from 'chakra-react-select'

export const customStyles: ChakraStylesConfig = {
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
    marginTop: 0,
    zIndex: 10,
    boxShadow: 'var(--box-shadow)',
    borderRadius: 'md',
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
  }),
  option: (base, state) => ({
    ...base,
    fontWeight: 'bold',
    bgColor: state.isSelected && 'primary.500',
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

export const customStylesTokens: ChakraStylesConfig = {
  ...customStyles,
  option: (base, state) => ({
    ...base,
    fontWeight: 'bold',
    bgColor: state.isSelected && 'primary.500',
    pl: 10,
  }),
}
