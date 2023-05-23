import { WarningIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react'
import {
  ElectionActions,
  ElectionDescription,
  ElectionSchedule,
  ElectionTitle,
  enforceHexPrefix,
  useClient,
  useElection,
  useOrganization,
} from '@vocdoni/chakra-components'
import { ElectionStatus } from '@vocdoni/sdk'
import { useTranslation } from 'react-i18next'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { ProcessDate } from './Date'

const ProcessHeader = () => {
  const { t } = useTranslation()
  const { election } = useElection()
  const { account } = useClient()
  const { organization } = useOrganization()

  return (
    <Box mb={4}>
      <Flex justifyContent='space-between' mb={4} alignItems='center'>
        <Link to={`/organization/0x${election?.organizationId}`}>
          <Button
            leftIcon={<FaRegArrowAltCircleLeft />}
            display='flex'
            justifyContent='center'
            alignItems='center'
            h={8}
            maxW={30}
            py={2}
            px={2}
            fontSize='sm'
            fontWeight={400}
            border='1px solid'
            bgColor='process.header.btn_bg'
            color='process.header.btn_color'
            borderRadius={18}
          >
            <Text as='span' overflow='hidden' isTruncated>
              {organization?.account.name.default || enforceHexPrefix(organization?.address)}
            </Text>
          </Button>
        </Link>
      </Flex>
      <Flex direction={{ base: 'column', lg: 'row' }} gap={{ lg: 2 }}>
        <Box flexBasis='70%'>
          <ElectionSchedule mb={1} fontSize='md' textAlign='left' color='process.date' />
          <ElectionTitle mb={3} fontSize='3xl' lineHeight={1.2} textAlign='left' noOfLines={2} />
          <ElectionDescription mb={0} fontSize='lg' color='process.description' />
        </Box>

        {election?.status !== ElectionStatus.CANCELED && <Box bgColor='process.header.divider' w='2px'></Box>}

        <Flex flexDirection='column' gap={4} pl={{ lg: 5 }}>
          {election?.status !== ElectionStatus.CANCELED && <ProcessDate />}
          {election?.status === ElectionStatus.PAUSED && election?.organizationId !== account?.address && (
            <Box color='process.paused'>
              <Icon as={WarningIcon} />
              <Text>{t('process.status.canceled')}</Text>
              <Text>{t('process.status.canceled_description')}</Text>
            </Box>
          )}
          <ElectionActions />
        </Flex>
      </Flex>
    </Box>
  )
}

export default ProcessHeader
