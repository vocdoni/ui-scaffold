export const Button = {
  variants: {
    ghost: {
      border: '1px solid',
      borderRadius: '20px',
      height: '25px',
      fontSize: '0.8em',
    },
    underline: {
      border: 'none',
      bg: 'none',
      textDecoration: 'underline',
      color: 'branding.pink',
    },
    brandVote: {
      padding: '20px',
      height: '25px',
      backgroundColor: 'branding.pink',
      minWidth: 'none',
      bgGradient: 'linear(to-b, branding.lightpink3, branding.pink)',
      color: 'branding.lightpink1',
      _hover: {
        color: 'branding.pink',
        bgGradient: 'linear(to-b, branding.lightpink2, branding.lightpink4)',
      },
      _active: {
        transform: 'scale(0.95)',
      },
    },
  },
}
