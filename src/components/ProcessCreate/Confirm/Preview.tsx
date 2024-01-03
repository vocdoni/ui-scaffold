import { Box, ChakraProvider, extendTheme, Flex, Icon, Link, Text } from '@chakra-ui/react'
import { ElectionDescription, ElectionQuestions, ElectionTitle } from '@vocdoni/chakra-components'
import { useTranslation } from 'react-i18next'
import { IoMdCheckmark, IoMdClose, IoMdCreate } from 'react-icons/io'
import { IoCheckmarkSharp } from 'react-icons/io5'
import { cofirmTheme } from '~theme/components/Confirm'
import { useProcessCreationSteps } from '../Steps/use-steps'
import Census from './Census'

const Preview = () => {
  const { t } = useTranslation()
  const { form, setActiveStep } = useProcessCreationSteps()

  const datef = t('form.process_create.calendar.date_format')

  const {
    description,
    electionType: { secretUntilTheEnd, anonymous },
    maxVoteOverwrites,
    questions,
    startDate: begin,
    endDate: end,
  } = form

  return (
    <Flex flexDirection='column' gap={5} p={{ base: 3, xl: 6 }} bgColor='process_create.section' borderRadius='md'>
      <Flex flexDirection='column' gap={6}>
        <Flex>
          <Text fontWeight='bold'>{t('form.process_create.confirm.election_info')}</Text>
          <Link ml='auto' onClick={() => setActiveStep(1)}>
            <Icon
              as={IoMdCreate}
              title={t('form.process_create.confirm.edit')}
              aria-label={t('form.process_create.confirm.edit')}
            />
          </Link>
        </Flex>
        <Flex flexDirection={{ base: 'column', md: 'row' }} gap={{ base: 2, md: 0 }}>
          <Text flexBasis='30%' flexGrow={0} flexShrink={0} fontWeight='semibold' fontSize='md'>
            {t('form.process_create.confirm.title_election')}
          </Text>
          <ElectionTitle
            flexBasis={{ base: '100%', md: '65%' }}
            flexShrink={0}
            flexGrow={1}
            fontSize='md'
            textAlign='start'
            fontWeight='normal'
          />
        </Flex>
        {description && (
          <Flex flexDirection={{ base: 'column', md: 'row' }} gap={{ base: 2, md: 0 }}>
            <Text flexBasis='30%' flexGrow={0} flexShrink={0} fontWeight='semibold' fontSize='md'>
              {t('form.process_create.confirm.description_election')}
            </Text>

            <Box flexBasis={{ base: '100%', md: '65%' }} flexShrink={0} flexGrow={0} fontSize='md' textAlign='start'>
              <ElectionDescription />
            </Box>
          </Flex>
        )}
        <Flex flexDirection={{ base: 'column', md: 'row' }} gap={{ base: 2, md: 0 }}>
          <Text flexBasis='30%' flexGrow={0} flexShrink={0} fontWeight='semibold' fontSize='md'>
            {t('form.process_create.confirm.dates')}
          </Text>
          <Text flexBasis={{ base: '100%', md: '65%' }} flexShrink={0} flexGrow={0}>
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
          <Box flexBasis={{ base: '100%', md: '65%' }}>
            <Flex gap={2} alignItems='center'>
              <Icon as={maxVoteOverwrites ? IoCheckmarkSharp : IoMdClose} boxSize={5} />
              <Text>{t('form.process_create.confirm.vote_overwritte')}</Text>
            </Flex>
            <Flex gap={2} alignItems='center'>
              <Icon as={secretUntilTheEnd ? IoMdCheckmark : IoMdClose} boxSize={5} />
              <Text>{t('form.process_create.confirm.secret_until_the_end')}</Text>
            </Flex>
            <Flex gap={2} alignItems='center'>
              <Icon as={anonymous ? IoMdCheckmark : IoMdClose} boxSize={5} />
              <Text>{t('form.process_create.confirm.anonymous')}</Text>
            </Flex>
          </Box>
        </Flex>
      </Flex>

      <Flex flexDirection={{ base: 'column', md: 'row' }} gap={{ base: 2, md: 0 }} position='relative'>
        <Text flexBasis={{ md: '30%' }} flexShrink={0} flexGrow={0} fontWeight='extrabold'>
          {t('form.process_create.confirm.questions', { count: questions.length })}
        </Text>
        <Box flexBasis={{ base: '100%', md: '65%' }} flexShrink={0} flexGrow={0}>
          <ChakraProvider theme={extendTheme(cofirmTheme)}>
            <ElectionQuestions />
          </ChakraProvider>
        </Box>
        <Link position='absolute' top={0} right={0} onClick={() => setActiveStep(2)}>
          <Icon
            as={IoMdCreate}
            title={t('form.process_create.confirm.edit')}
            aria-label={t('form.process_create.confirm.edit')}
          />
        </Link>
      </Flex>

      <Flex flexDirection={{ base: 'column', md: 'row' }} gap={{ base: 2, md: 0 }} position='relative'>
        <Text flexBasis={{ md: '30%' }} flexShrink={0} flexGrow={0} fontWeight='extrabold'>
          {t('form.process_create.confirm.census')}
        </Text>
        <Box w={{ md: '65%' }}>
          <Census />
        </Box>
        <Link position='absolute' top={0} right={0} onClick={() => setActiveStep(3)}>
          <Icon
            as={IoMdCreate}
            title={t('form.process_create.confirm.edit')}
            aria-label={t('form.process_create.confirm.edit')}
          />
        </Link>
      </Flex>
    </Flex>
  )
}

export default Preview
