const variants = {
  'home-description-color': {
    color: 'home.description.light',

    _dark: {
      color: 'home.description.dark',
    },
  },
  'process-create-title': {
    fontWeight: 'bold',
  },
  'process-create-title-sm': {
    fontWeight: 'bold',
    fontSize: 'sm',
  },
  'process-create-subtitle': {
    color: 'process_create.text_secondary',
  },
  'process-create-subtitle-sm': {
    fontSize: 'sm',
    color: 'process_create.text_secondary',
  },
  'process-create-census-title': {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: 'process_create.text_brand',
    mb: 6,
  },
  'question-index': {
    position: 'absolute',
    fontSize: '100px',
    bottom: 0,
    right: 5,
    color: 'process_create.question_index',
    opacity: 0.2,
  },

  'enumeration-title': {
    color: 'gray.400',
    fontSize: 'sm',
    fontWeight: 600,
  },
}

export const Text = {
  variants,
}
