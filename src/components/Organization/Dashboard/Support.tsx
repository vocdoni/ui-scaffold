import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { LuInfo, LuLock, LuSparkles } from 'react-icons/lu'
import { generatePath, Link as ReactRouterLink } from 'react-router-dom'
import { useSaasAccount } from '~components/Account/useSaasAccount'
import { useSubscription } from '~components/Auth/Subscription'
import InputBasic from '~components/Layout/InputBasic'
import { IssueTypeSelector, SelectOptionType } from '~components/Layout/SaasSelector'
import { Routes } from '~src/router/routes'
import { maskValue } from '~utils/strings'

type FormData = {
  name: string
  issueType: SelectOptionType
  description: string
}

type SubscriptionLockedContentProps = {
  children: (args: { isLocked: boolean }) => React.ReactNode
}

const OrganizationSupport = () => {
  const { t } = useTranslation()

  return (
    <Box>
      <Heading size='md' fontWeight='extrabold'>
        {t('organization_settings.support.title', { defaultValue: 'Support' })}
      </Heading>
      <Text mb={8} color='gray.500'>
        {t('organization_settings.support.description', {
          defaultValue: 'Get help and support for your organization.',
        })}
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <SupportTicketForm />
        <SubscriptionLockedContent>
          {({ isLocked }) => <PhoneSupportCard isLocked={isLocked} />}
        </SubscriptionLockedContent>
      </SimpleGrid>
    </Box>
  )
}

const SupportTicketForm = () => {
  const { t } = useTranslation()
  const methods = useForm<FormData>({})
  const { handleSubmit, register } = methods

  return (
    <FormProvider {...methods}>
      <Box as='form' p={6} borderWidth='1px' borderRadius='lg' onSubmit={handleSubmit((data) => console.log(data))}>
        <Heading size='md' mb={2}>
          {t('form.support.open_ticket', { defaultValue: 'Open a Support Ticket' })}
        </Heading>
        <Text fontSize='sm' color='gray.500' mb={6}>
          {t('form.support.subtitle', {
            defaultValue: 'Submit a ticket and our support team will get back to you as soon as possible.',
          })}
        </Text>
        <VStack spacing={4} align='stretch'>
          <InputBasic
            formValue='name'
            label={t('form.support.name', { defaultValue: 'Name' })}
            placeholder={t('form.support.name_placeholder', {
              defaultValue: 'Your Name',
            })}
            required
          />
          <IssueTypeSelector name='issueType' required />
          <FormControl isRequired={true}>
            <FormLabel>{t('form.support.description', { defaultValue: 'Description' })}</FormLabel>
            <Textarea
              {...register('description')}
              placeholder={t('form.support.description_placeholder', { defaultValue: 'Describe your issue in detail' })}
            />
          </FormControl>
          <Button type='submit' colorScheme='blackAlpha' mt={4}>
            {t('form.support.submit_ticket', { defaultValue: 'Submit Ticket' })}
          </Button>
        </VStack>
      </Box>
    </FormProvider>
  )
}

const SubscriptionLockedContent = ({ children }: SubscriptionLockedContentProps) => {
  const { t } = useTranslation()
  const { subscription, loading } = useSubscription()

  if (loading) return <Progress size='xs' isIndeterminate colorScheme='gray' />

  const hasPhoneSupport = subscription?.plan.features.phoneSupport
  const isLocked = !hasPhoneSupport

  return (
    <Box position='relative' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Box
        pointerEvents={isLocked ? 'none' : 'auto'}
        filter={isLocked ? 'blur(5px)' : ''}
        transition='filter 0.2s ease'
        zIndex={0}
      >
        {children({ isLocked })}
      </Box>
      {isLocked && (
        <Box
          position='absolute'
          top={0}
          left={0}
          right={0}
          bottom={0}
          display='flex'
          alignItems='center'
          justifyContent='center'
          flexDirection='column'
          backdropFilter='blur(5px)'
          px={4}
          zIndex={1}
        >
          <Icon as={LuLock} boxSize={8} mb={4} />
          <Text fontWeight='bold' mb={2}>
            {t('organization_settings.phone_support.locked', {
              defaultValue: 'Phone Support is available with an Unlimited plan',
            })}
          </Text>
          <Text fontSize='sm' color='gray.500' mb={4}>
            {t('organization_settings.phone_support.locked_description', {
              defaultValue: 'Upgrade to our Unlimited plan to get priority phone support with dedicated agents.',
            })}
          </Text>
          <Button
            as={ReactRouterLink}
            to={generatePath(Routes.dashboard.settings.subscription)}
            leftIcon={<Icon as={LuSparkles} mr={2} />}
            colorScheme='blackAlpha'
          >
            {t('organization_settings.phone_support.unlock', {
              defaultValue: 'Unlock Phone Support',
            })}
          </Button>
        </Box>
      )}
    </Box>
  )
}

const PhoneSupportCard = ({ isLocked }) => {
  const { t } = useTranslation()
  const { organization, isLoading } = useSaasAccount()
  const prioritySupportPhone = import.meta.env.PRIORITY_SUPPORT_PHONE

  if (isLoading) return <Progress size='xs' isIndeterminate colorScheme='gray' />

  return (
    <Box p={6}>
      <Heading size='md' mb={1}>
        {t('organization_settings.phone_support.title', { defaultValue: 'Phone Support' })}
      </Heading>
      <Text fontSize='sm' color='gray.500' mb={6}>
        {t('organization_settings.phone_support.description', {
          defaultValue: 'Available for Unlimited plan subscribers only.',
        })}
      </Text>

      <Stack spacing={4} mb={6}>
        <Flex p={4} borderRadius='md' bg='gray.100' align='flex-start'>
          <Box
            bg='gray.200'
            borderRadius='full'
            fontWeight='bold'
            fontSize='sm'
            w='40px'
            h='40px'
            display='flex'
            alignItems='center'
            justifyContent='center'
            mt='2px'
            mr={3}
          >
            ?
          </Box>
          <Box>
            <Text fontWeight='medium'>
              {t('organization_settings.phone_support.priority_support_line', {
                defaultValue: 'Priority Support Line',
              })}
            </Text>
            <Text fontSize='lg' fontWeight='extrabold'>
              {maskValue(prioritySupportPhone, isLocked)}
            </Text>
            <Text fontSize='sm' color='gray.500'>
              {t('organization_settings.phone_support.priority_support_line_description', {
                defaultValue: 'Available Monday–Friday, 9:00–18:00 CET',
              })}
            </Text>
          </Box>
        </Flex>

        <Flex p={4} borderRadius='md' bg='gray.100' align='flex-start'>
          <Box
            bg='gray.200'
            borderRadius='full'
            fontWeight='bold'
            fontSize='sm'
            w='40px'
            h='40px'
            display='flex'
            alignItems='center'
            justifyContent='center'
            mr={3}
          >
            ID
          </Box>
          <Box>
            <Text fontWeight='medium'>
              {t('organization_settings.phone_support.organization_id', {
                defaultValue: 'Your Organization ID',
              })}
            </Text>
            <Text fontFamily='mono' color='gray.800'>
              {maskValue(organization.address, isLocked)}
            </Text>
            <Text fontSize='sm' color='gray.500'>
              {t('organization_settings.phone_support.organization_id_description', {
                defaultValue: 'Please provide this ID when contacting support',
              })}
            </Text>
          </Box>
        </Flex>
      </Stack>

      <Flex align='center' mb={6}>
        <Icon as={LuInfo} boxSize={4} mr={2} />
        <Text fontSize='sm' color='gray.600'>
          {t('organization_settings.phone_support.info', {
            defaultValue: 'Please have your organization ID ready when calling.',
          })}
        </Text>
      </Flex>

      <Stack spacing={3}>
        <Button
          as={ReactRouterLink}
          variant='outline'
          colorScheme='gray'
          to='https://calendly.com/vocdoni-app/30min'
          aria-label={t('organization_settings.phone_support.schedule_call', { defaultValue: 'Schedule a Call' })}
          title={t('organization_settings.phone_support.schedule_call', { defaultValue: 'Schedule a Call' })}
          target='_blank'
          disabled={isLocked}
        >
          {t('organization_settings.phone_support.schedule_call', { defaultValue: 'Schedule a Call' })}
        </Button>
      </Stack>
    </Box>
  )
}

export default OrganizationSupport
