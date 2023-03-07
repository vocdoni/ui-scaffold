import { Box, Button } from '@chakra-ui/react'
import { FaLongArrowAltRight } from 'react-icons/fa'

interface Props {
  children: JSX.Element
}

const ButtonGhost = ({ children }: Props) => (
  <Button
    textAlign='center'
    marginX='auto'
    borderRadius={24}
    height={25}
    backgroundColor='transparent'
    color='purple'
    border='1px solid'
    fontSize='.8em'
  >
    {children}
    <Box as='span' mt={0.5} ml={2}>
      <FaLongArrowAltRight />
    </Box>
  </Button>
)

export default ButtonGhost
