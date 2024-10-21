import { Button, Icon, useColorMode } from '@chakra-ui/react'
import { IoMdMoon, IoMdSunny } from 'react-icons/io'

const DarkModeToggle = (props: { [x: string]: any }) => {
  const { ...rest } = props
  const { colorMode, toggleColorMode } = useColorMode()
  let bgButton = 'linear-gradient(135deg, #B5F492 0%, #338B93 100%)'

  return (
    <Button
      h='36px'
      w='36px'
      minW={0}
      bg={bgButton}
      variant='no-effects'
      border='1px solid'
      borderColor='#B5F492'
      borderRadius='50px'
      onClick={toggleColorMode}
      display='flex'
      p='0px'
      alignItems='center'
      justifyContent='center'
      {...rest}
    >
      <Icon h='18px' w='18px' color='white' as={colorMode === 'light' ? IoMdMoon : IoMdSunny} />
    </Button>
  )
}

export default DarkModeToggle
