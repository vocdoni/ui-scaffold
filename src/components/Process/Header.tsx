import { ExternalLinkIcon, WarningIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react'
import { ElectionDescription, ElectionSchedule, ElectionTitle } from '@vocdoni/react-components'
import { ElectionStatus, PublishedElection } from '@vocdoni/sdk'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { ProcessDate } from './Date'

const ProcessHeader = ({ election }: { election?: PublishedElection }) => {
  return (
    <Box mb={4}>
      <Flex justifyContent='space-between' alignItems='center' mb={5}>
        <Link to={`/organization/0x${election?.organizationId}`}>
          <Button
            variant='unstyled'
            display='flex'
            justifyContent='center'
            alignItems='center'
            fontSize='sm'
            fontWeight={400}
            border={{ md: '1px solid black' }}
            bgColor={{ base: 'process.header.btn_mobile_bg', md: 'process.header.btn_desktop_bg' }}
            color={{ base: 'process.header.btn_mobile_color', md: 'process.header.btn_desktop_color' }}
            borderRadius={18}
            h={7}
            py={2}
            px={2}
            leftIcon={<FaRegArrowAltCircleLeft />}
          >
            <Text as='span' mb='px'>
              {'Org Name'.toUpperCase()}
            </Text>
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
              bgColor={{ base: 'process.header.btn_mobile_bg', md: 'process.header.btn_desktop_bg' }}
              w={8}
              h={8}
              borderRadius='50%'
              border={{ md: '1px solid black' }}
            >
              <Icon
                as={ExternalLinkIcon}
                boxSize={5}
                color={{ base: 'process.header.btn_mobile_color', md: 'process.header.btn_desktop_color' }}
              />
            </Flex>
          </Button>
        </Link>
      </Flex>
      <Flex direction={{ base: 'column', lg: 'row' }} gap={{ lg: 2 }}>
        <Flex direction='column' gap={5} flexBasis='70%'>
          <Box>
            <ElectionSchedule textAlign='left' color='process.date' fontSize='md' />
            <ElectionTitle fontSize='5xl' noOfLines={2} mb={0} textAlign='left' />
          </Box>
          <ElectionDescription color='process.description' fontSize='lg' mb={0} />
        </Flex>

        <Box bgColor='process.header_divider' w='2px'></Box>
        {/* <Box bgColor='process.header_divider' h='px'></Box> */}

        <Box>
          {election?.status === ElectionStatus.CANCELED ? <Text color='process.info'>Canceled</Text> : <ProcessDate />}
          {election?.status === ElectionStatus.PAUSED && (
            <Flex alignItems='center' gap={2} color='process.paused'>
              <Icon as={WarningIcon} />
              <Text>Election paused</Text>
            </Flex>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

export default ProcessHeader
