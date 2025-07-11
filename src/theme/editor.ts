const editor = {
  '.lexical-bold': {
    fontWeight: 'extrabold',
  },
  '.lexical-italic': {
    fontStyle: 'italic',
  },
  '.lexical-underline': {
    textDecoration: 'underline',
  },
  '.lexical-strikethrough': {
    textDecoration: 'line-through',
  },
  '.lexical-underline.lexical-strikethrough': {
    textDecoration: 'underline line-through',
  },
  '.lexical-ul': {
    paddingLeft: '20px',
  },
  '.lexical-ol': {
    paddingLeft: '20px',
  },
  '.lexical-li': {
    marginBottom: '10px',
  },
  '.lexical-link': {
    color: 'gray.800',
    _dark: {
      color: 'gray.400',
      _hover: {
        color: 'gray.200',
      },
    },
    _hover: {
      textDecoration: 'underline',
      color: 'gray.500',
    },
  },
}

export default editor
