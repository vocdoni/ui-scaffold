import { ChakraStylesConfig } from 'chakra-react-select'

export const selectStyles: ChakraStylesConfig = {
  control: (base) => ({
    ...base,
    padding: 0,
    fontSize: 'sm',
    borderRadius: 'sm',
    border: '1px solid rgb(228, 228, 231) !important',
    paddingRight: 2,
    paddingLeft: 2,
    _focusVisible: {
      border: 'none',
    },
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: '0px',
    width: '2px',
    color: 'rgb(113, 113, 122)',
  }),
  valueContainer: (base) => ({
    ...base,
    p: 0,
    mr: 2,
  }),
  option: (base) => ({
    ...base,
    padding: '8px',
    fontSize: 'sm',
    fontWeight: 'normal',
    bgColor: 'white',
    p: 1,
    borderRadius: 'sm',

    _hover: {
      bgColor: 'hsl(240 4.8% 95.9%)',
    },
  }),
  menu: (base) => ({
    ...base,
    zIndex: 10,
    minW: 'fit-content',
  }),
  menuList: (base) => ({
    ...base,
    p: 1,
    borderRadius: 'sm',
  }),
}
