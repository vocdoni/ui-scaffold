import { Box, Flex, Text } from '@chakra-ui/react'
import { formatDistance } from 'date-fns'

const ProcessViewNav = ({
  startDate,
  endDate,
}: {
  endDate: any
  startDate: any
}) => {
  return (
    <Flex ml='auto'>
      <Box px={4} pt={1}>
        <Text color='branding.purple'>
          {startDate > endDate
            ? 'Process starts'
            : new Date() < endDate
            ? 'Process ends'
            : 'Process finished'}
        </Text>
        <Text>
          {formatDistance(new Date(), endDate!)} {new Date() > endDate && 'ago'}
        </Text>
      </Box>
    </Flex>
  )
}

export default ProcessViewNav
