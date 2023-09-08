import { confirmAnatomy } from '@vocdoni/chakra-components'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import i18n from '../../i18n/index'
import { countReset } from 'console'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(confirmAnatomy)

const baseStyle = definePartsStyle({
  content: {
    position: 'relative',
    px: 12,
  },
  header: {
    textAlign: 'center',
    minH: 40,
    borderRadius: 'lg',
    position: 'relative',
    mb: 60,

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
      content: '"Before casting your vote review that everything is correct."',
      position: 'absolute',
      top: 60,
      left: 0,
      width: '100%',
      height: '100%',
      fontWeight: 'normal',
      fontSize: 'md',
      textAlign: 'start',
    },
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    p: 2,
    overflowY: 'scroll',
    maxH: 40,
    boxShadow: '2px 2px 4px 2px #808080b5',
    borderRadius: 'md',
    mb: 3,

    '& > div > p': {
      fontWeight: 'bold',
      position: 'absolute',
      mt: -12,
      fontSize: 'lg',
      ml: -2,
      w: '350px',

      '&::before': {
        content: '"Remember that in this election mode, you are able to correct your vote X times."',
        position: 'absolute',
        top: -16,
        left: 0,
        width: '100%',
        height: '100%',
        fontWeight: 'normal',
        fontSize: 'md',
        textAlign: 'start',
        w: 'full',
      },
    },

    '& > div > div': {
      pr: 2,
      pb: 4,
      borderBottom: '.1px solid lightgray',

      '& > div:first-of-type': {
        fontWeight: 'normal',

        '&:before': {
          content: `"${i18n.t('process.spreadsheet.confirm.question')}- "`,
          fontWeight: 'bold',
        },
      },
      '& > div:nth-of-type(2)': {
        fontWeight: 'normal',
        counterIncrement: 'section',

        '&:before': {
          content: `"${i18n.t('process.spreadsheet.confirm.option')}- "`,
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
