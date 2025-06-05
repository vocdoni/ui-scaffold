import { Box, Button, ButtonGroup, HStack, Icon, IconButton, Input, Textarea, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { LuSettings } from 'react-icons/lu'
import { DashboardContents } from '~components/shared/Dashboard/Contents'
import { Questions } from './MainContent/Questions'
import { CreateSidebar } from './Sidebar'

export type Process = {
  title: string
  description: string
  autoStart: boolean
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  questionType: 'single' | 'multiple'
  questions: {
    title: string
    description: string
    options: { text: string }[]
  }[]
  resultVisibility: 'live' | 'hidden'
  voterPrivacy: 'anonymous' | 'public'
  voteOverwrite: boolean
  maxVoteOverwrites: number
  census: string
}

export const ProcessCreate = () => {
  const { t } = useTranslation()
  const [showSidebar, setShowSidebar] = useState(true)
  const methods = useForm<Process>({
    defaultValues: {
      title: '',
      description: '',
      autoStart: true,
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      questionType: 'single',
      questions: [{ options: [{ text: '' }, { text: '' }] }],
      resultVisibility: 'live',
      voterPrivacy: 'anonymous',
      voteOverwrite: false,
      maxVoteOverwrites: 0,
      census: '',
    },
  })

  const onSubmit = (data: Process) => {
    console.log('Form data:', data)
  }

  return (
    <FormProvider {...methods}>
      <DashboardContents
        as='form'
        onSubmit={methods.handleSubmit(onSubmit)}
        display='flex'
        flexDirection='row'
        position='relative'
      >
        {/* Main content area */}
        <Box
          flex={1}
          marginRight={showSidebar ? '350px' : 0}
          transition='margin-right 0.3s'
          display='flex'
          flexDirection='column'
          gap={8}
          paddingRight={4}
          paddingBottom={4}
        >
          {/* Top bar with draft status and sidebar toggle */}
          <HStack justifyContent='space-between'>
            <Box px={3} py={1} borderRadius='full' bg='gray.100' _dark={{ bg: 'whiteAlpha.200' }} fontSize='sm'>
              <Trans i18nKey='process.create.status.draft'>Draft</Trans>
            </Box>
            <ButtonGroup size='sm'>
              <IconButton
                aria-label={t('dashboard.actions.toggle_sidebar', {
                  defaultValue: 'Toggle sidebar',
                })}
                icon={<Icon as={LuSettings} />}
                variant='outline'
                onClick={() => setShowSidebar((prev) => !prev)}
              />
              <Button type='submit' colorScheme='blue' alignSelf='flex-end'>
                <Trans i18nKey='process.create.action.publish'>Publish</Trans>
              </Button>
            </ButtonGroup>
          </HStack>

          {/* Title and Description */}
          <VStack as='header' align='stretch' spacing={4}>
            <Input
              variant='unstyled'
              placeholder={t('process.create.title.placeholder', 'Voting Process Title')}
              fontSize='2xl'
              fontWeight='bold'
              {...methods.register('title')}
            />
            <Textarea
              variant='unstyled'
              placeholder={t('process.create.description.placeholder', 'Add a description...')}
              resize='none'
              minH='100px'
              {...methods.register('description')}
            />
          </VStack>

          <Questions />
        </Box>

        <CreateSidebar show={showSidebar} />
      </DashboardContents>
    </FormProvider>
  )
}

export default ProcessCreate
