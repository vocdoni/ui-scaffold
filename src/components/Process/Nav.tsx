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
            ? 'Voting starts'
            : new Date() < endDate
            ? 'Voting ends'
            : 'Voting finished'}
        </Text>
        <Text>{formatDistance(new Date(), endDate!)}</Text>
      </Box>
    </Flex>
  )
}

export default ProcessViewNav
