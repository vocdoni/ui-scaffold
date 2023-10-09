import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { confirmAnatomy } from '@vocdoni/chakra-components'
import i18n from '../../i18n/index'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(confirmAnatomy)

const baseStyle = definePartsStyle({
  content: {
    position: 'relative',
    px: 12,
    py: 4,
  },
  header: {
    textAlign: 'center',
    minH: '150px',
    borderRadius: 'lg',
    position: 'relative',
    mb: 40,

    '&::before': {
      content: '""',
      backgroundImage: 'url(/assets/spreadsheet-confirm-modal.png)',
      backgroundSize: 'cover',
      position: 'absolute',

      top: 14,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: 'lg',
    },

    '&::after': {
      content: `"${i18n.t('process.spreadsheet.confirm.text1')}"`,
      position: 'absolute',
      textAlign: 'center',
      top: '220px',
      left: 0,
      width: '100%',
      height: '100%',
      fontWeight: 'normal',
      fontSize: 'sm',
      color: 'modal_description',
    },
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    p: 2,
    overflowY: 'scroll',
    maxH: 40,
    boxShadow: 'rgba(128, 128, 128, 0.42) 1px 1px 1px 1px',
    borderRadius: 'md',
    mb: 3,
    mt: { base: 4, xl3: 0 },

    '& > div > p': {
      fontWeight: 'bold',
      position: 'absolute',
      mt: -12,
      fontSize: 'lg',
      ml: -2,
      w: '350px',
      textAlign: 'center',
    },

    '& > div > div': {
      pl: 2,
      pt: 1,
      pb: 5,
      borderBottom: '.1px solid lightgray',

      '& > div:first-of-type': {
        fontWeight: 'normal',

        '&:before': {
          content: `"${i18n.t('process.spreadsheet.confirm.question')} - "`,
          fontWeight: 'bold',
        },
      },
      '& > div:nth-of-type(2)': {
        fontWeight: 'normal',
        counterIncrement: 'section',

        '&:before': {
          content: `"${i18n.t('process.spreadsheet.confirm.option')} - "`,
          fontWeight: 'bold',
        },
      },
    },
    '& > div > div:last-of-type': {
      borderBottom: 'none',
      pb: 0,
    },
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  confirm: {
    bgColor: 'process.identify_btn.bg',
    color: 'process.identify_btn.color',
    borderRadius: 'full',
    px: 16,

    _hover: {
      bgColor: 'process.identify_btn.bg_hover',
    },

    _active: {
      bgColor: 'process.identify_btn.bg_active',
    },
  },
  cancel: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: 'white',

    _hover: {
      bgColor: 'white',

      '&::after': {
        bgColor: 'gray.200',
      },
    },
    _active: {
      bgColor: 'white',

      '&::after': {
        bgColor: 'gray.300',
      },
    },

    '&::after': {
      content: '"X"',
      position: 'absolute',
      color: 'black',
      right: 2,
      py: 1,
      px: 2,
      borderRadius: 'md',
    },
  },
})

export const ConfirmModal = defineMultiStyleConfig({
  baseStyle,
})
