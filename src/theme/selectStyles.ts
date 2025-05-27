import { ChakraStylesConfig } from 'chakra-react-select'

export const selectStyles: ChakraStylesConfig = {
  container: (base) => ({
    ...base,
    border: 'none',
  }),
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
}
