import { Box, ChakraProvider, extendTheme, Flex, Icon, Link, Text, Tooltip } from '@chakra-ui/react'
import { ElectionDescription, ElectionQuestions, ElectionTitle } from '@vocdoni/chakra-components'
import { useTranslation } from 'react-i18next'
import { AiTwotoneQuestionCircle } from 'react-icons/ai'
import { IoMdCheckmark, IoMdClose, IoMdCreate } from 'react-icons/io'
import { IoCheckmarkSharp } from 'react-icons/io5'
import { confirmTheme } from '~theme/components/Confirm'
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
    accuracy,
  } = form

  const features =
    import.meta.env.features.vote.anonymous ||
    import.meta.env.features.vote.overwrite ||
    import.meta.env.features.vote.secret

  return (
    <Flex
      className='process-create-section'
      flexDirection='column'
      gap={5}
      p={{ base: 3, xl: 6 }}
      bgColor='process_create.section'
    >
      <Flex flexDirection='column' gap={6}>
        <Flex>
          <Text className='brand-theme' textTransform='uppercase'>
            {t('form.process_create.confirm.election_info')}
          </Text>
          <Link variant='primary' ml='auto' onClick={() => setActiveStep(1)}>
            <Icon
              as={IoMdCreate}
              title={t('form.process_create.confirm.edit')}
              aria-label={t('form.process_create.confirm.edit')}
            />
          </Link>
        </Flex>
        <Flex flexDirection={{ base: 'column', md: 'row' }} gap={{ base: 2, md: 0 }}>
          <Text flexBasis='30%' flexGrow={0} flexShrink={0} fontWeight='bold'>
            {t('form.process_create.confirm.title_election')}
          </Text>
          <ElectionTitle
            flexBasis={{ base: '100%', md: '65%' }}
            flexShrink={0}
            flexGrow={0}
            fontSize='md'
            textAlign='start'
            fontWeight='normal'
          />
        </Flex>
        {description && (
          <Flex flexDirection={{ base: 'column', md: 'row' }} gap={{ base: 2, md: 0 }}>
            <Text flexBasis='30%' flexGrow={0} flexShrink={0} fontWeight='bold'>
              {t('form.process_create.confirm.description_election')}
            </Text>

            <Box
              className='md-sizes'
              flexBasis={{ base: '100%', md: '65%' }}
              flexShrink={0}
              flexGrow={0}
              textAlign='start'
            >
              <ElectionDescription />
            </Box>
          </Flex>
        )}
        <Flex flexDirection={{ base: 'column', md: 'row' }} gap={{ base: 2, md: 0 }}>
          <Text flexBasis='30%' flexGrow={0} flexShrink={0} fontWeight='bold'>
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
        {features && (
          <Flex flexDirection={{ base: 'column', md: 'row' }} gap={{ base: 2, md: 0 }}>
            <Text flexBasis='30%' flexGrow={0} flexShrink={0} fontWeight='bold'>
              {t('form.process_create.confirm.configuration')}
            </Text>
            <Box flexBasis={{ base: '100%', md: '65%' }}>
              {import.meta.env.features.vote.overwrite && (
                <Flex gap={2} alignItems='center'>
                  <Icon as={maxVoteOverwrites ? IoCheckmarkSharp : IoMdClose} boxSize={5} />
                  <Text>{t('form.process_create.confirm.vote_overwrite')}</Text>
                </Flex>
              )}
              {import.meta.env.features.vote.secret && (
                <Flex gap={2} alignItems='center'>
                  <Icon as={secretUntilTheEnd ? IoMdCheckmark : IoMdClose} boxSize={5} />
                  <Text>{t('form.process_create.confirm.secret_until_the_end')}</Text>
                </Flex>
              )}
              {import.meta.env.features.vote.anonymous && (
                <Flex gap={2} alignItems='center'>
                  <Icon as={anonymous ? IoMdCheckmark : IoMdClose} boxSize={5} />
                  <Text>{t('form.process_create.confirm.anonymous')}</Text>
                </Flex>
              )}
            </Box>
          </Flex>
        )}
      </Flex>

      <Flex flexDirection={{ base: 'column', md: 'row' }} gap={{ base: 2, md: 0 }} position='relative'>
        <Text flexBasis={{ md: '30%' }} flexShrink={0} flexGrow={0} fontWeight='bold'>
          {t('form.process_create.confirm.questions', { count: questions.length })}
        </Text>
        <Box flexBasis={{ base: '100%', md: '65%' }} flexShrink={0} flexGrow={0}>
          <ChakraProvider theme={extendTheme(confirmTheme)}>
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
        <Text flexBasis={{ md: '30%' }} flexShrink={0} flexGrow={0} fontWeight='bold'>
          {t('form.process_create.confirm.census')}
        </Text>
        <Box w={{ md: '65%' }}>
          <Census />
          {form.electionType.anonymous && (
            <Text display='flex' alignItems='center' flexWrap='wrap' gap={1}>
              <Text as='span' fontWeight='bold'>
                {t('process_create.preview.accuracy')}
              </Text>
              {accuracy.toFixed()}%
              <Tooltip
                label={t('process_create.anonymous.legal_note') + t('process_create.anonymous.legal_disclaimer')}
              >
                <Text as='span' mb='4px'>
                  <AiTwotoneQuestionCircle />
                </Text>
              </Tooltip>
            </Text>
          )}
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
