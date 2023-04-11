const ghost = {
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: 'branding.pink',
  color: 'branding.pink',

  _hover: {
    backgroundColor: 'branding.pink',
    color: 'white',
  },
}

const branding = {
  backgroundColor: 'branding.pink',
  color: 'white',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: 'branding.pink',

  _hover: {
    backgroundColor: 'white',
    color: 'branding.pink',
  },
}

const brand_vote = {
  padding: 6,
  backgroundColor: 'branding.purple',
  minWidth: 18,
  color: 'white',
}

const underline = {
  border: 'none',
  bg: 'none',
  color: 'branding.pink',
  _hover: {
    textDecoration: 'underline',
  },
}

export const Button = {
  variants: {
    ghost,
    branding,
    underline,
    brand_vote,
  },
}
