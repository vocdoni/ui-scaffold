import { Box, Checkbox, Icon, Text } from '@chakra-ui/react'
import { StampIcon } from '~components/ProcessCreate/Census/Gitcoin/StampIcon'

interface IStampCardProps {
  name: string
  stampId: string
}

export const StampCard: React.FC<IStampCardProps> = ({ name, stampId }) => {
  return (
    <Checkbox flex='0 0 30%' variant='radiobox'>
      <Box>
        <StampIcon stampId={stampId} />
        <Text>{name}</Text>
      </Box>
    </Checkbox>
  )
}
