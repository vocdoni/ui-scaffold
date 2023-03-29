const ghost = {
  border: '1px solid',
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

  _hover: {
    backgroundColor: 'white',
    color: 'branding.pink',
    outline: '1px solid',
    borderColor: 'branding.pink',
    outlineOffset: '-1px',
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
  textDecoration: 'underline',
  color: 'branding.pink',
}

export const Button = {
  variants: {
    ghost,
    branding,
    underline,
    brand_vote,
  },
}
