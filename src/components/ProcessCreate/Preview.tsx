import { Box, ChakraProvider, extendTheme, Flex, Icon, Link, Text, useBreakpointValue } from '@chakra-ui/react'
import { ElectionQuestions, ElectionTitle, useElection } from '@vocdoni/chakra-components'
import { useTranslation } from 'react-i18next'
import { IoCheckmark, IoCloseOutline } from 'react-icons/io5'
import { addressTextOverflow } from '../../constants'
import { cofirmTheme } from '../../theme/confirmProvider'
import { useProcessCreationSteps } from './Steps/use-steps'

const Preview = () => {
  const { t } = useTranslation()
  const { election } = useElection()
  const { form, setActiveStep } = useProcessCreationSteps()

  const value = useBreakpointValue({
    base: 12,
    sm: 17,
    md: 14,
    lg: null,
  })

  const datef = t('form.process_create.calendar.date_format')

  const {
    addresses,
    censusType,
    electionType: { secretUntilTheEnd },
    maxVoteOverwrites,
    questions,
    startDate: begin,
    endDate: end,
  } = form

  return (
    <ChakraProvider theme={extendTheme(cofirmTheme)}>
      <Flex
        flexDirection='column'
        gap={16}
        p={5}
        mb={10}
        bgColor='process_create.confirm.box_bg'
        borderRadius='lg'
        border='1px solid'
        borderColor='process_create.border'
      >
        <Flex flexDirection='column' gap={6}>
          <Flex>
            <Text fontWeight='bold'>{t('form.process_create.confirm.election_info')}</Text>
            <Link variant='brand' ml='auto' onClick={() => setActiveStep(1)}>
              {t('form.process_create.confirm.edit')}
            </Link>
          </Flex>
          <Flex flexDirection={{ base: 'column', md: 'row' }} gap={{ base: 2, md: 0 }}>
            <Text flexBasis='30%' flexGrow={0} flexShrink={0} fontWeight='semibold' fontSize='md'>
              {t('form.process_create.confirm.title')}
            </Text>
            <ElectionTitle flexGrow={1} fontSize='md' textAlign='start' fontWeight='normal' />
          </Flex>
          <Flex flexDirection={{ base: 'column', md: 'row' }} gap={{ base: 2, md: 0 }}>
            <Text flexBasis='30%' flexGrow={0} flexShrink={0} fontWeight='semibold' fontSize='md'>
              {t('form.process_create.confirm.description')}
            </Text>

            <Text flexGrow={1} fontSize='md' textAlign='start'>
              {election?.description.default}
            </Text>
          </Flex>
          <Flex flexDirection={{ base: 'column', md: 'row' }} gap={{ base: 2, md: 0 }}>
            <Text flexBasis='30%' flexGrow={0} flexShrink={0} fontWeight='semibold' fontSize='md'>
              {t('form.process_create.confirm.dates')}
            </Text>
            <Text>
              {t('form.process_create.calendar.end_date_description', {
                date: {
                  begin: begin ? new Date(begin) : new Date(),
                  end: end && new Date(end),
                },
                format: datef,
              })}
            </Text>
          </Flex>
          <Flex flexDirection={{ base: 'column', md: 'row' }} gap={{ base: 2, md: 0 }}>
            <Text flexBasis='30%' flexGrow={0} flexShrink={0} fontWeight='semibold' fontSize='md'>
              {t('form.process_create.confirm.configuration')}
            </Text>
            <Box>
              <Flex gap={2} alignItems='center'>
                <Icon as={maxVoteOverwrites ? IoCheckmark : IoCloseOutline} boxSize={3} />
                <Text>{t('form.process_create.confirm.vote_overwritte')}</Text>
              </Flex>
              <Flex gap={2} alignItems='center'>
                <Icon as={secretUntilTheEnd ? IoCheckmark : IoCloseOutline} boxSize={3} />
                <Text>{t('form.process_create.confirm.secret_until_the_end')}</Text>
              </Flex>
            </Box>
          </Flex>
        </Flex>

        <Flex flexDirection='column' gap={6}>
          <Flex>
            <Text fontWeight='bold'>{t('form.process_create.confirm.questions', { count: questions.length })}</Text>
            <Link variant='brand' ml='auto' onClick={() => setActiveStep(1)}>
              {t('form.process_create.confirm.edit')}
            </Link>
          </Flex>

          <Box ml={{ md: 'auto' }} w={{ md: '70%' }}>
            <ElectionQuestions />
          </Box>
        </Flex>
        <Flex flexDirection='column' gap={6}>
          <Flex>
            <Text fontWeight='semibold'>{t('form.process_create.confirm.census')}</Text>
            <Link variant='brand' ml='auto' onClick={() => setActiveStep(1)}>
              {t('form.process_create.confirm.edit')}
            </Link>
          </Flex>

          {censusType === 'web3' && (
            <Flex flexDirection='column' gap={1} width={{ md: '70%' }} ml={{ md: 'auto' }}>
              <Box
                p={2}
                width='min-content'
                height={80}
                borderRadius='lg'
                boxShadow='var(--box-shadow-navbar)'
                overflowY='scroll'
              >
                {addresses.map((address, index) => (
                  <Box key={index} mb={1}>
                    <Text as='span' fontWeight='bold'>
                      {index + 1}-
                    </Text>
                    {addressTextOverflow((address as any).address, value)}
                  </Box>
                ))}
              </Box>
              <Text color='process_create.confirm.census_web3_text_helper'>
                {t('form.process_create.confirm.web3_number_addresses', { addresses: addresses.length })}
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </ChakraProvider>
  )
}

export default Preview
