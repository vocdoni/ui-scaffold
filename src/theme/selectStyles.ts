import { ChakraStylesConfig } from 'chakra-react-select'

export const selectStyles: ChakraStylesConfig = {
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
  placeholder: (base) => ({
    ...base,
    py: 2,
    px: 3,
  }),
}
