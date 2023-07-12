import { WarningIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react'
import {
  ElectionActions,
  ElectionDescription,
  ElectionSchedule,
  ElectionTitle,
  OrganizationName,
  useClient,
  useElection,
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

  return (
    <Box mb={4}>
      <Link to={`/organization/0x${election?.organizationId}`}>
        <Button leftIcon={<FaRegArrowAltCircleLeft />} mb={4}>
          <OrganizationName as='span' overflow='hidden' fontSize='sm' isTruncated />
        </Button>
      </Link>
      <Flex direction={{ base: 'column', xl: 'row' }}>
        <Box flexBasis='70%' flexGrow={0} flexShrink={0} mr={{ xl: 10 }}>
          <ElectionSchedule mb={1} textAlign='left' color='process.date' />
          <ElectionTitle mb={3} fontSize='xl3' lineHeight={1.2} textAlign='left' noOfLines={2} />
          <ElectionDescription mb={0} fontSize='lg' color='process.description' />
        </Box>

        {election?.status !== ElectionStatus.CANCELED && <Box bgColor='process.header_divider' w='px' />}

        <Flex flexDirection='column' alignItems='start' gap={4} pl={{ xl: 5 }}>
          {election?.status !== ElectionStatus.CANCELED ? (
            <ProcessDate />
          ) : (
            <Text color='process.canceled' fontWeight='bold'>
              {t('process.status.canceled')}
            </Text>
          )}

          {election?.status === ElectionStatus.PAUSED && election?.organizationId !== account?.address && (
            <Flex
              color='process.paused'
              gap={2}
              alignItems='center'
              border='1px solid'
              borderColor='process.paused'
              borderRadius='lg'
              p={2}
            >
              <Icon as={WarningIcon} />
              <Box>
                <Text>{t('process.status.paused')}</Text>
                <Text>{t('process.status.paused_description')}</Text>
              </Box>
            </Flex>
          )}
          <ElectionActions sx={{ '& div': { flexDirection: 'row', justifyContent: 'start' } }} />
        </Flex>
      </Flex>
    </Box>
  )
}

export default ProcessHeader
