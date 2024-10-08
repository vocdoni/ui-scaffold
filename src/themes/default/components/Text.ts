const variants = {
  'process-create-title': (props) => ({
    fontWeight: 'bold',
  }),
  'process-create-title-sm': (props) => ({
    fontWeight: 'bold',
    fontSize: 'sm',
  }),
  'process-create-subtitle': (props) => ({
    color: 'process_create.description',
  }),
  'process-create-subtitle-sm': (props) => ({
    fontSize: 'sm',
    color: 'process_create.description',
  }),
  'process-create-census-title': (props) => ({
    fontWeight: 'bold',
    textTransform: 'uppercase',
    mb: 6,
  }),
}

export const Text = {
  variants,
}
