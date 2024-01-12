import { VoteButton as CVoteButton } from '@vocdoni/chakra-components'

const VoteButton = ({ ...props }) => (
  <CVoteButton
    variant='secondary'
    _disabled={{
      bgColor: 'button_disabled.bg !important',
      color: 'button_disabled.color',
      borderColor: 'button_disabled.bg',
      cursor: 'default',

      _before: {
        bgColor: 'button_disabled.bg',
        transition: 'none',
      },
      _after: {
        bgColor: 'button_disabled.bg ',
        transition: 'none',
      },

      _hover: {
        transition: 'none',
        borderColor: 'button_disabled.bg',

        _before: {
          width: '100%',
          bgColor: 'button_disabled.bg',
        },
        _after: {
          width: '100%',
          bgColor: 'button_disabled.bg',
        },
      },
    }}
    {...props}
  />
)

export default VoteButton
