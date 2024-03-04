import { Box, Checkbox, Text } from '@chakra-ui/react'
import { StampIcon, StampId } from '~components/ProcessCreate/Census/Gitcoin/StampIcon'
import { Controller } from 'react-hook-form'

interface IStampCardProps {
  name: string
  stampId: StampId
}

export const StampCard: React.FC<IStampCardProps> = ({ name, stampId }) => {
  return (
    <Controller
      name={`stamps.${stampId}`}
      defaultValue={false}
      render={({ field }) => (
        <Checkbox {...field} flex='0 0 30%' variant='radiobox'>
          <Box>
            <StampIcon stampId={stampId} />
            <Text>{name}</Text>
          </Box>
        </Checkbox>
      )}
    />
  )
}
