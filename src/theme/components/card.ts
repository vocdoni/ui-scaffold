import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(cardAnatomy.keys)

export const Card = defineMultiStyleConfig({
  variants: {
    calendar: {
      container: {
        border: '1px solid #4E525C',
        flexDirection: 'row',
        p: 5,
        gap: 5,
        bgColor: 'transparent',
        borderRadius: 'xl',
      },
      header: {
        p: 0,
      },
      body: { p: 0 },
    },
    'download-spreadsheet': {
      container: {
        p: 6,
        maxW: 64,
        bgColor: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
        mx: 'auto',
      },
      body: {
        p: 0,
        flexGrow: 0,
        textAlign: 'center',
      },
      footer: {
        p: 0,
      },
    },

    'pricing-card': {
      container: {
        position: 'relative',
        borderRadius: 'xl',
        bgColor: 'pricing_card.bg.light',
        minW: { base: '80%', sm: 72 },
        w: { base: '80%', sm: 72 },
        _dark: {
          bgColor: 'pricing_card.bg.dark',
          border: '0.1px solid',
          borderColor: 'pricing_card.border_dark',
        },
      },
      header: {
        pb: 0,
        minH: 28,
        '& > p:first-of-type': {
          pt: 1.5,

          textAlign: 'center',
          fontWeight: 'bold',
          mb: 2.5,
          fontSize: 'lg',
        },
        '& > p:nth-of-type(2)': {
          fontSize: 'sm',
          textAlign: 'center',
          lineHeight: 1.2,
          color: 'pricing_card.subtitle.light',

          _dark: {
            color: 'pricing_card.subtitle.dark',
          },
        },
      },
      body: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        pt: 0,
        '& > button': {
          mx: 'auto',
          mt: 3,
          mb: 2,
          w: 'full',
        },
        '& > p:first-of-type': {
          fontWeight: 'extrabold',
          textAlign: 'center',
          fontSize: 'xl',
          mb: 4,
        },
        '& > div:last-of-type': {
          ml: 3,

          '& > ul': {
            maxW: 'fit-content',
            mx: 'auto',
            fontSize: 'sm',
            listStyleType: '"- "',
          },
        },
      },
      footer: {
        display: 'flex',
        justifyContent: 'center',

        '& button': {
          color: 'pricing_card_btn',
        },
      },
    },

    'web3-addresses': {
      container: {
        flexDirection: 'column',
        minH: '220px',
        overflowY: 'scroll',
        borderRadius: 'xl',
        my: 6,
        bgColor: 'process_create.bg_secondary.light',
        _dark: {
          bgColor: 'process_create.bg_secondary.dark',
        },
      },
    },

    confirm: {
      container: {
        display: 'flex',
        flex: { xl2: '0 0 25%' },
        p: 6,
        bgColor: 'process_create.bg_secondary.light',
        borderRadius: 'xl',
        minW: 76,

        _dark: {
          bgColor: 'process_create.bg_secondary.dark',
        },
      },
    },
    client: {
      container: {
        border: 'none',
        backgroundColor: 'none',

        _hover: {
          lg: {
            '& div:first-of-type': {
              filter: 'none',
            },
            '& span': {
              display: 'block',
            },
          },
        },
      },
      header: {
        p: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        filter: 'grayscale(100%)',
        h: { base: '35px', lg: '45px' },

        _dark: {
          filter: 'grayscale(0%)',
        },
      },
      body: {
        p: 0,
        fontSize: '10px',
        minH: '40px',

        span: {
          display: 'none',
          textAlign: 'center',
          fontSize: '12px',
          fontWeight: 'bold',
          color: 'home.description.light',
          marginTop: '22px',
          _dark: {
            color: 'home.description.dark',
          },
        },
      },
    },
    benefits: {
      container: {
        w: '350px',
        backdropFilter: 'blur(16px)',
        borderBottomWidth: '0',
        borderBottomColor: 'rgba(255, 255, 255, .15)',
        borderLeftWidth: '0',
        borderLeftColor: 'rgba(255, 255, 255, .15)',
        borderRightWidth: '1px',
        borderRightColor: 'rgba(255, 255, 255, .2)',
        borderRadius: '8px',
        flexDirection: 'column',
        display: 'flex',
        overflow: 'hidden',
        boxShadow: 'inset 0 -1px 0 1px rgba(255, 255, 255, .2), 0 8px 22px rgba(0, 0, 0, .12)',

        '&:nth-of-type(1)': {
          bgColor: 'home.benefits.bg.light.primary',
          color: 'home.benefits.color.light.bg_primary',
        },
        '&:nth-of-type(2)': {
          bgColor: 'home.benefits.bg.light.white',
          color: 'home.benefits.color.light.bg_white',
          _dark: {
            bgColor: 'home.benefits.bg.dark.dark',
            color: 'home.benefits.color.dark',
          },
        },
        '&:nth-of-type(3)': {
          bgColor: {
            base: 'home.benefits.bg.light.primary',
            benefits1: 'home.benefits.bg.light.white',
            benefits2: 'home.benefits.bg.light.primary',
          },
          color: {
            base: 'home.benefits.color.light.bg_primary',
            benefits1: 'home.benefits.color.light.bg_white',
            benefits2: 'home.benefits.color.light.bg_primary',
          },

          _dark: {
            bgColor: {
              base: 'home.benefits.bg.light.primary',
              benefits1: 'home.benefits.bg.dark.dark',
              benefits2: 'home.benefits.bg.light.primary',
            },
            color: {
              base: 'home.benefits.color.light.bg_primary',
              benefits1: 'home.benefits.color.dark',
              benefits2: 'home.benefits.color.light.bg_primary',
            },
          },
        },
        '&:nth-of-type(4)': {
          bgColor: {
            base: 'home.benefits.bg.light.white',
            benefits1: 'home.benefits.bg.light.primary',
            benefits2: 'home.benefits.bg.light.white',
          },
          color: {
            base: 'home.benefits.color.light.bg_white',
            benefits1: 'home.benefits.color.light.bg_primary',
            benefits2: 'home.benefits.color.light.bg_white',
          },

          _dark: {
            bgColor: {
              base: 'home.benefits.bg.dark.dark',
              benefits1: 'home.benefits.bg.light.primary',
              benefits2: 'home.benefits.bg.dark.dark',
            },
            color: {
              base: 'home.benefits.color.dark',
              benefits1: 'home.benefits.color.light.bg_primary',
              benefits2: 'home.benefits.color.dark',
            },
          },
        },
        '&:nth-of-type(5)': {
          bgColor: 'home.benefits.bg.light.primary',
          color: 'home.benefits.color.light.bg_primary',
        },
        '&:nth-of-type(6)': {
          bgColor: 'home.benefits.bg.light.white',
          color: 'home.benefits.color.light.bg_white',

          _dark: {
            bgColor: 'home.benefits.bg.dark.dark',
            color: 'home.benefits.color.dark',
          },
        },
      },
      header: {
        p: '30px',
        pb: '20px',
        fontSize: { base: '28.5px', sm: '28px' },
        lineHeight: { base: '38px', sm: '37px' },
        fontWeight: 'bold',
        textAlign: 'left',
        fontFamily: 'basier',
      },
      body: {
        p: '30px',
        pt: 0,
        textAlign: 'left',
      },
    },
    'icon-card': {
      container: {
        bgColor: 'transparent',
      },
      body: {
        p: 0,
        display: 'flex',
        gap: '24px',

        'div:first-of-type': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 'lg',
          minW: '45px',
          h: '45px',
          bgColor: 'home.features_icon',

          svg: {
            width: '25px',
            height: '25px',
            color: 'white',
          },
        },

        'div:last-of-type': {
          'p:first-of-type': {
            fontWeight: '600',
            mb: '15px',
            fontSize: '26px',
            lineHeight: '32px',
            mr: 2,
          },

          'p:last-of-type': {
            fontSize: '22px',
            color: 'home.description.light',
          },
        },
      },
    },
    'image-card': {
      container: {
        bgColor: 'transparent',
      },
      body: {
        p: 0,
        display: 'flex',
        gap: '24px',
        alignItems: 'center',

        'div:first-of-type': {
          backgroundColor: 'transparent',
          w: '120px',
          h: '120px',
          minW: '120px',
        },

        'div:last-of-type': {
          'p:first-of-type': {
            fontWeight: '600',
            mb: '15px',
            fontSize: '26px',
            lineHeight: '32px',
          },

          'p:last-of-type': {
            fontSize: '22px',
            color: 'home.description.light !important',

            _dark: {
              color: 'home.description.dark !important',
            },
          },
        },
      },
    },
    step: {
      container: {
        backgroundColor: 'transparent',
      },
      body: {
        p: 0,
        display: 'flex',
        gap: '24px',

        'div:first-of-type': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 'lg',
          minW: '45px',
          h: '45px',
          border: '1px solid gray',
          bgColor: 'home.step.icon_bg',

          svg: {
            width: '25px',
            height: '25px',
            color: 'home.step.icon',
          },
        },

        'div:last-of-type': {
          'p:first-of-type': {
            fontSize: '26px',
            lineHeight: '32px',
            fontWeight: 'bold',
            mb: '15px',
          },
          'p:nth-of-type(2)': {
            fontSize: '22px',
            color: 'home.description.light !important',

            _dark: {
              color: 'home.description.dark !important',
            },
          },
        },
      },
    },
    faqs: {
      container: {
        borderRadius: 'none',
        borderBottom: '1px solid rgb(229, 229, 229)',
        backgroundColor: 'transparent',
        fontSize: '22px',
      },
      header: {
        p: 0,
        '& p': {
          fontWeight: 'bold',
          mb: '18px',
        },
      },
      body: {
        p: 0,
        mb: '19px',

        '& p': {
          color: 'home.description.light !important',

          _dark: {
            color: 'home.description.dark !important',
          },
        },
      },
    },
    solutions: {
      container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        borderRadius: 'md',
        boxShadow: 'var(--box-shadow)',
        p: 3,
        bgColor: 'home.solutions.light_bg',
        fontWeight: 'bold',

        _dark: {
          bgColor: 'home.solutions.dark_bg',
        },
      },
    },
    'no-elections': {
      container: {
        bgColor: 'bg_secondary.light',

        _dark: {
          bgColor: 'bg_secondary.dark',
        },
      },
    },
    aside: {
      container: {
        direction: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        px: { base: 6, xl2: 8 },
        py: { base: 6, xl2: 8 },
        w: 'full',
        gap: 4,
        mt: { md: 7 },
        mb: { base: 7, xl2: 0 },
        color: 'process.aside.color',
        background: 'process.aside.bg',
        boxShadow: 'var(--box-shadow-banner)',
        borderRadius: 'lg',
        fontSize: 'text',
      },
    },
  },
})
