import { ExternalLinkIcon, WarningIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react'
import { ElectionDescription, ElectionSchedule, ElectionTitle, useClientContext } from '@vocdoni/react-components'
import { ElectionStatus, PublishedElection } from '@vocdoni/sdk'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { ProcessDate } from './Date'

const ProcessHeader = ({ election }: { election?: PublishedElection }) => {
  const { account } = useClientContext()

  return (
    <Box mb={4}>
      <Flex justifyContent='space-between' mb={4} alignItems='center'>
        <Link to={`/organization/0x${election?.organizationId}`}>
          <Button
            leftIcon={<FaRegArrowAltCircleLeft />}
            variant='unstyled'
            display='flex'
            justifyContent='center'
            alignItems='center'
            h={7}
            py={2}
            px={2}
            fontSize='sm'
            fontWeight={400}
            border='1px solid black'
            bgColor={{ base: 'process.header.btn_mobile_bg', lg: 'process.header.btn_desktop_bg' }}
            color={{ base: 'process.header.btn_mobile_color', lg: 'process.header.btn_desktop_color' }}
            borderRadius={18}
            borderColor={{ base: 'transparent', md: 'process.header.btn_border' }}
          >
            <Text as='span'>{'Org Name'.toUpperCase()}</Text>
          </Button>
        </Link>
        <Link to='#'>
          <Button
            variant='unstyled'
            display='flex'
            justifyContent='center'
            alignItems='center'
            gap={2}
            fontSize='sm'
            fontWeight={400}
          >
            <Text as='span' mb='px'>
              Share
            </Text>
            <Flex
              justifyContent='center'
              alignItems='center'
              p={1}
              w={8}
              h={8}
              bgColor={{ base: 'process.header.btn_mobile_bg', lg: 'process.header.btn_desktop_bg' }}
              borderRadius='50%'
              border='1px solid black'
              borderColor={{ base: 'transparent', md: 'process.header.btn_border' }}
            >
              <Icon
                as={ExternalLinkIcon}
                boxSize={5}
                color={{ base: 'process.header.btn_mobile_color', lg: 'process.header.btn_desktop_color' }}
              />
            </Flex>
          </Button>
        </Link>
      </Flex>
      <Flex direction={{ base: 'column', lg: 'row' }} gap={{ lg: 2 }}>
        <Box flexBasis='70%'>
          <ElectionSchedule mb={1} fontSize='md' textAlign='left' color='process.date' />
          <ElectionTitle mb={3} fontSize='5xl' textAlign='left' noOfLines={2} />
          <ElectionDescription mb={0} fontSize='lg' color='process.description' />
        </Box>

        <Box bgColor='process.header.divider' w='2px'></Box>

        <Flex flexDirection='column' gap={4}>
          {election?.status === ElectionStatus.CANCELED ? <Text color='process.info'>Canceled</Text> : <ProcessDate />}
          {election?.status === ElectionStatus.PAUSED && election?.organizationId !== account?.address && (
            <Box color='process.paused'>
              <Icon as={WarningIcon} />
              <Text>Election paused</Text>
              <Text>It's not possible to vote right now</Text>
            </Box>
          )}
        </Flex>
      </Flex>
    </Box>
  )
}

export default ProcessHeader
