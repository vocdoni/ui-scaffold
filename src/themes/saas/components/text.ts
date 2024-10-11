import { mode } from '@chakra-ui/theme-tools'

const variants = {
  'process-create-title': (props) => ({
    fontWeight: 'bold',
  }),
  'process-create-title-sm': (props) => ({
    fontWeight: 'bold',
    fontSize: 'sm',
  }),
  'process-create-subtitle': (props) => ({
    color: 'text_secondary',
  }),
  'process-create-subtitle-sm': (props) => ({
    fontSize: 'sm',
    color: 'text_secondary',
  }),
  'process-create-census-title': (props) => ({
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: 'text.brand',
    mb: 6,
  }),
}

export const Text = {
  variants,
}
