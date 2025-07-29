import { ChakraStylesConfig } from 'chakra-react-select'

export const selectStyles: ChakraStylesConfig = {
  placeholder: (base) => ({
    ...base,
    color: 'input.placeholder',
  }),
}

export const languagesListSelectStyles: ChakraStylesConfig = {
  dropdownIndicator: (base) => ({
    ...base,
    m: 0,
  }),
  valueContainer: (base) => ({
    ...base,
    p: 0,
    mr: 0,
  }),
  menu: (base) => ({
    ...base,
    minW: 'fit-content',
  }),
  menuList: (base) => ({
    ...base,
    p: 1,
    borderRadius: 'sm',
  }),
  placeholder: (base, state) => ({
    ...selectStyles.placeholder?.(base, state),
    py: 2,
    px: 3,
  }),
}
