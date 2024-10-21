import { mode } from '@chakra-ui/theme-tools'

const variants = {
  'home-description-color': (props) => ({
    color: mode('home.description.light', 'home.description.dark')(props),
  }),
  'process-create-title': (props) => ({
    fontWeight: 'bold',
  }),
  'process-create-title-sm': (props) => ({
    fontWeight: 'bold',
    fontSize: 'sm',
  }),
  'process-create-subtitle': (props) => ({
    color: 'process_create.text_secondary',
  }),
  'process-create-subtitle-sm': (props) => ({
    fontSize: 'sm',
    color: 'process_create.text_secondary',
  }),
  'process-create-census-title': (props) => ({
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: 'process_create.text_brand',
    mb: 6,
  }),
  'question-index': (props) => ({
    position: 'absolute',
    fontSize: '100px',
    bottom: 0,
    right: 5,
    color: 'process_create.question_index',
    opacity: 0.2,
  }),
}

export const Text = {
  variants,
}
