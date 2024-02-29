import { Box, Checkbox, Icon, Text } from '@chakra-ui/react'
import { IconType } from 'react-icons'

interface IStampCardProps {
  name: string
  icon: IconType
}

export const StampCard: React.FC<IStampCardProps> = ({ name, icon }) => {
  return (
    <Checkbox flex='0 0 30%' variant='radiobox'>
      <Box>
        <Icon as={icon} />
        <Text>{name}</Text>
      </Box>
    </Checkbox>
  )
}
