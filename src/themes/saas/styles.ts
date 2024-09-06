import { mode } from '@chakra-ui/theme-tools'
export const globalStyles = {
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode('secondaryGray.300', 'navy.900')(props),
        fontFamily: 'DM Sans',
        letterSpacing: '-0.5px',
      },
      input: {
        color: 'gray.700',
      },
      html: {
        fontFamily: 'DM Sans',
        border: '3px solid red',
      },
    }),
  },
}
