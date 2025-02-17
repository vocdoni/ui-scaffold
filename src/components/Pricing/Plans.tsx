import { AddIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { MutableRefObject, ReactNode, useMemo } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { FaPhoneVolume, FaRegCheckCircle } from 'react-icons/fa'
import { Link as ReactRouterLink } from 'react-router-dom'
import { ApiEndpoints } from '~components/Auth/api'
import { useSubscription } from '~components/Auth/Subscription'
import { useAuth } from '~components/Auth/useAuth'
import { PlanId } from '~constants'
import { QueryKeys } from '~src/queries/keys'
import { Routes } from '~src/router/routes'
import { currency } from '~utils/numbers'
import PricingCard from './Card'
import { usePricingModal } from './use-pricing-modal'

export type Plan = {
  id: number
  name: string
  stripeID: string
  startingPrice: number
  default: boolean
  organization: {
    members: number
    subOrgs: number
    censusSize: number
    maxProcesses: number
    maxCensus: number
    maxDuration: string
    customURL: boolean
    drafts: number
  }
  votingTypes: {
    single: boolean
    multiple: boolean
    approval: boolean
    cumulative: boolean
    ranked: boolean
    weighted: boolean
  }
  features: {
    anonymous: boolean
    overwrite: boolean
    liveResults: boolean
    personalization: boolean
    emailReminder: boolean
    smsNotification: boolean
    whiteLabel: boolean
    liveStreaming: boolean
  }
  censusSizeTiers?:
    | {
        amount: number
        upTo: number
      }[]
    | null
}

type FormValues = {
  censusSize: number | null
  planId: number | null
}

export const usePlans = () => {
  const { bearedFetch } = useAuth()
  return useQuery({
    queryKey: QueryKeys.plans,
    queryFn: () => bearedFetch<Plan[]>(ApiEndpoints.Plans),
    // Sort by price
    select: (data) => data.sort((a, b) => a.startingPrice - b.startingPrice),
    // Cache for 20 minutes
    staleTime: 20 * 60 * 1000,
  })
}

export const usePlanTranslations = () => {
  const { t } = useTranslation()
  const translations = {
    [PlanId.Free]: {
      title: t('pricing.free_title', { defaultValue: 'Free' }),
      subtitle: t('pricing.free_subtitle', {
        defaultValue: 'For small orgs or communities with up to 50 members.',
      }),
      features: [
        t('pricing.core_voting', { defaultValue: 'Core voting features' }),
        t('pricing.up_to_1_admin', {
          defaultValue: '{{ admin }} administrator',
          admin: 1,
        }),
        t('pricing.yearly_processes', { defaultValue: '{{ count }} yearly voting process', count: 5 }),
        t('pricing.gpdr_compilance', { defaultValue: 'GDPR compilant' }),
        t('pricing.demo', { defaultValue: 'Start exploring for free' }),
        t('pricing.free_plan_members', { defaultValue: 'Max. 50 voters' }),
      ],
    },
    [PlanId.Essential]: {
      title: t('pricing.essential_title', { defaultValue: 'Essential' }),
      subtitle: t('pricing.essential_subtitle', {
        defaultValue: 'Perfect medium orgs or groups with fundamental voting needs, supporting up to 500 voters.',
      }),
      features: [
        t('pricing.core_voting'),
        t('pricing.up_to_admins', { admin: 1, org: 1 }),
        t('pricing.yearly_processes', { count: 5 }),
        t('pricing.basic_analytics'),
        t('pricing.ticket_support'),
        t('pricing.gpdr_compilance'),
        t('pricing.extra_voter_cost', { defaultValue: 'Only {{price}}€ per extra voter', price: '0.30' }),
        t('pricing.plan_members', { defaultValue: 'Includes up to {{base}} voters', base: '500' }),
      ],
    },
    [PlanId.Premium]: {
      title: t('pricing.premium_title', { defaultValue: 'Premium' }),
      subtitle: t('pricing.premium_subtitle', {
        defaultValue: 'Larger amount that require more advanced features.',
      }),
      features: [
        t('pricing.core_voting', { defaultValue: 'Core voting features' }),
        t('pricing.up_to_admins', { admin: 5, org: 1 }),
        t('pricing.unlimited_yearly_processes', { defaultValue: 'Unlimited yearly voting processes' }),
        t('pricing.advanced_analytitcs', { defaultValue: 'Advanced reporting and analytics' }),
        t('pricing.priority_support', { defaultValue: 'Priority ticket support' }),
        t('pricing.gpdr_compilance'),
        t('pricing.extra_voter_cost', { defaultValue: 'Only {{price}}€ per extra voter', price: '0.26' }),
        t('pricing.plan_members', { defaultValue: 'Includes up to {{base}} voters', base: '1000' }),
      ],
    },
    [PlanId.Custom]: {
      title: t('pricing.custom_title', { defaultValue: 'Custom' }),
      subtitle: t('pricing.custom_subtitle', {
        defaultValue:
          'Large organizations, enterprises, and institutions requiring extensive customization and support',
      }),
      features: [
        t('pricing.all_features', { defaultValue: 'All features & voting types' }),
        t('pricing.up_to_admins', { admin: 10, org: 5 }),
        t('pricing.unlimited_yearly_processes', { defaultValue: 'Unlimited yearly voting processes' }),
        t('pricing.white_label', { defaultValue: 'White label solution' }),
        t('pricing.dedicated_manager', { defaultValue: 'Dedicated account manager' }),
        t('pricing.priority_support', { defaultValue: 'Priority ticket support' }),
        t('pricing.extra_voter_cost', { defaultValue: 'Only {{price}}€ per extra voter', price: '0.22' }),
        t('pricing.plan_members', { defaultValue: 'Includes up to {{base}} voters', base: '2500' }),
      ],
    },
  }

  return translations
}

export const SubscriptionPlans = ({ featuresRef }: { featuresRef?: MutableRefObject<HTMLDivElement> }) => {
  const { t } = useTranslation()
  const { subscription } = useSubscription()
  const { data: plans, isLoading } = usePlans()
  const translations = usePlanTranslations()
  const { openModal } = usePricingModal()

  // Find the best fitting tier for the current subscription's census size
  const defaultCensusSize = useMemo(() => {
    if (!plans || !subscription?.subscriptionDetails?.maxCensusSize) return null

    // Get all available tiers across all plans
    const allTiers = plans.flatMap((plan) => plan.censusSizeTiers || [])

    // Sort by upTo value to find the smallest tier that fits
    const sortedTiers = allTiers.sort((a, b) => a.upTo - b.upTo)

    // Find the first tier that can accommodate the current census size
    const bestFitTier = sortedTiers.find((tier) => tier.upTo >= subscription.subscriptionDetails.maxCensusSize)

    return bestFitTier?.upTo || null
  }, [plans, subscription?.subscriptionDetails?.maxCensusSize])

  const methods = useForm<FormValues>({
    defaultValues: {
      censusSize: defaultCensusSize,
      planId: null,
    },
  })

  const { watch, handleSubmit } = methods
  const selectedCensusSize = watch('censusSize')

  const onSubmit = (data: FormValues) => {
    openModal('subscriptionPayment', {
      amount: data.censusSize,
      lookupKey: data.planId,
    })
  }

  const censusSizeOptions = useMemo(() => {
    if (!plans) return []

    // Step 1: Merge censusSizeTiers from all plans, removing duplicates
    const mergedTiers = plans
      .flatMap((plan) => plan.censusSizeTiers || []) // Combine all tiers
      .reduce((acc, tier) => {
        if (!acc.has(tier.upTo)) {
          acc.set(tier.upTo, tier) // Keep unique `upTo` values
        }
        return acc
      }, new Map<number, { upTo: number }>())

    // Step 2: Create options array from merged and sorted tiers
    const sortedTiers = Array.from(mergedTiers.values()).sort((a, b) => a.upTo - b.upTo)

    const options = sortedTiers.map((tier, idx) => {
      const previous = sortedTiers[idx - 1] || { upTo: 0 }
      const from = previous.upTo + 1
      return {
        label: t('pricing.members_size', { defaultValue: '{{ from }}-{{ to }} members', from, to: tier.upTo }),
        value: tier.upTo,
      }
    })

    return options
  }, [plans, t])

  const cards = useMemo(() => {
    if (!plans) return []

    return plans.map((plan) => ({
      popular: plan.id === PlanId.Premium,
      title: translations[plan.id]?.title || plan.name,
      subtitle: translations[plan.id]?.subtitle || '',
      price: currency(
        selectedCensusSize
          ? (plan.censusSizeTiers?.find((tier) => tier.upTo === selectedCensusSize)?.amount ?? plan.startingPrice)
          : plan.startingPrice
      ),
      features: translations[plan.id]?.features || [],
      isDisabled:
        (selectedCensusSize && !plan.censusSizeTiers?.some((tier) => tier.upTo === selectedCensusSize)) ||
        (subscription && plan.id === subscription?.plan.id && !selectedCensusSize),
    }))
  }, [plans, selectedCensusSize, subscription, translations])

  const handleViewFeatures = () => {
    if (featuresRef && featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.open(Routes.plans + '?compare')
    }
  }

  return (
    <Box>
      <Text
        fontSize={{ base: '28px', md: '32px', md2: '38px', lg2: '42px' }}
        lineHeight={{ base: '32px', md: '36px', md2: '42px', lg2: '46px' }}
        fontWeight='300'
        fontFamily='basier'
        textAlign='center'
        mb={'10px'}
      >
        <Trans i18nKey='pricing.title'>
          Voting processes at the <strong>lowest cost per voter</strong>
        </Trans>
      </Text>
      <Text fontSize='20px' fontWeight='100' textAlign='center' fontFamily='basier' w='90%' mx='auto'>
        Encuentre la solución ideal que se adapte a sus necesidades de votación. Ofrecemos opciones flexibles y
        transparentes para cualquier tipo de organización y acto electoral. Para más detalles, consulte a nuestros
        asesores
      </Text>

      <Box
        position='fixed'
        bottom='20px'
        right='20px'
        maxWidth='12%'
        border='1px solid #ccc'
        padding='25px'
        textAlign='center'
        borderRadius='12px'
        minW='225px'
        zIndex='1000'
        boxShadow='inset 0 -1px 0 1px rgba(255, 255, 255, .2),0 8px 22px rgba(0, 0, 0, .12)'
        bgColor={'plans.cards.light'}
        _dark={{ bgColor: 'plans.cards.dark' }}
      >
        <Text fontSize='16px' fontWeight='600' mb='20px'>
          ¿Do you need more than 10K voters?
        </Text>
        <Text fontSize='12px' mb='20px'>
          Get a tailored price from our experts
        </Text>
        <Box position='absolute' top='5px' right='10px'>
          x
        </Box>

        <Button variant='primary' mx='auto' minW='80%'>
          Contact us!
        </Button>
      </Box>

      <Flex
        flexWrap='wrap'
        justifyContent='center'
        maxW='1240px'
        columnGap={{ sm: 6, sm2: 10, lg: 14 }}
        rowGap={8}
        as='section'
        id='benefits'
        width='full'
        mx='auto'
        my={{ base: '50px' }}
      >
        <Card variant='benefits' flex={{ base: '1 1 100%', sm: '0 0 75%', sm2: '0 0 60%', lg: '0 0 40%' }}>
          <Image
            role='none'
            src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398f29a3e8913631fd48de5_card-feature-img-control.png'
          />
          <CardHeader fontSize='32px' mt='-20px'>
            Subscription Plans
          </CardHeader>
          <CardBody>
            <Text mb='20px' fontSize='18px'>
              Effortless, secure, and configurable digital voting at your fingertips. A ready-to-use, guided
              self-service platform designed for flexible and reliable voting processes.
            </Text>

            <Flex
              gap='2'
              ml='20px'
              color='home.support.helper'
              opacity='.8'
              fontSize='17px'
              lineHeight='32px'
              alignItems='center'
            >
              <FaRegCheckCircle /> Easy to set up and manage
            </Flex>
            <Flex
              gap='2'
              ml='20px'
              color='home.support.helper'
              opacity='.8'
              fontSize='17px'
              lineHeight='32px'
              alignItems='center'
            >
              <FaRegCheckCircle /> Customizable voting configurations
            </Flex>
            <Flex
              gap='2'
              ml='20px'
              color='home.support.helper'
              opacity='.8'
              fontSize='17px'
              lineHeight='32px'
              alignItems='center'
            >
              <FaRegCheckCircle /> Scalable for organizations up to 10k voters
            </Flex>

            <Button
              variant='outline'
              colorScheme='whiteAlpha'
              aria-label={t('home.support.btn_contact')}
              title={t('home.support.btn_contact')}
              height='50px'
              color='white'
              mt='30px'
              mx='auto'
              minW='280px'
            >
              Get Started
            </Button>
          </CardBody>
        </Card>

        <Card variant='benefits' flex={{ base: '1 1 100%', sm: '0 0 75%', sm2: '0 0 60%', lg: '0 0 40%' }}>
          <Image
            role='none'
            src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398f29a7812b3fd5db1d246_card-feature-img-agile.png'
          />
          <CardHeader fontSize='32px' mt='-20px'>
            Soluciones a medida
          </CardHeader>
          <CardBody>
            <Text mb='20px' fontSize='18px'>
              For organizations with complex needs and high-stakes voting processes. A key-in-hand service with custom
              features, expert support, and unlimited census capacity.
            </Text>

            <Flex gap='2' ml='20px' opacity='.8' fontSize='17px' lineHeight='32px' alignItems='center'>
              <FaRegCheckCircle /> Fully customized voting workflows
            </Flex>
            <Flex gap='2' ml='20px' opacity='.8' fontSize='17px' lineHeight='32px' alignItems='center'>
              <FaRegCheckCircle /> High-security standards and compliance
            </Flex>
            <Flex gap='2' ml='20px' opacity='.8' fontSize='17px' lineHeight='32px' alignItems='center'>
              <FaRegCheckCircle /> Scalable for large-scale elections
            </Flex>

            <Button
              as={ReactRouterLink}
              variant='primary'
              to='https://calendly.com/vocdoni-app/30min'
              aria-label={t('home.support.btn_watch')}
              title={t('home.support.btn_watch')}
              target='_blank'
              height='50px'
              color='white'
              mt='30px'
              mx='auto'
              w='280px'
            >
              <FaPhoneVolume size={30} />
              <Text as='span' ml='10px'>
                {t('home.support.btn_watch')}
              </Text>
            </Button>
          </CardBody>
        </Card>
      </Flex>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Text
            fontSize={{ base: '28px', md: '32px', md2: '38px', lg2: '42px' }}
            lineHeight={{ base: '32px', md: '36px', md2: '42px', lg2: '46px' }}
            fontWeight='300'
            fontFamily='basier'
            textAlign='center'
            mb={'10px'}
            mt='150px'
          >
            <Trans>Vocdoni Voting - Licencia Anual</Trans>
          </Text>
          <Text fontSize='20px' fontWeight='100' textAlign='center' fontFamily='basier' w='80%' mx='auto'>
            Elige uno de los paquetes de subscripción en función del número de titulares de licencia que haya en tu
            organización o personaliza el tamaño. You can get started at no cost with our Free plan{' '}
            <i>(limited to 50 voters)</i>. Upgrade at any moment to unlock larger voter capacity, advanced features and
            more.
          </Text>

          <Flex flexDir='column' gap={4}>
            {/* SELECT VOTERS CARD */}
            <Box
              bgColor={'plans.cards.light'}
              _dark={{ bgColor: 'plans.cards.dark' }}
              p='20px 40px'
              borderRadius='12px'
              mb='40px'
              mt='50px'
            >
              <Flex flexDir='row' flexWrap={'wrap'} gap={0}>
                <Flex flex={{ base: '1 1 100%', lg: '1 1 60%' }} flexDir='column'>
                  <Text fontSize='22px' fontWeight='200' mt='20px'>
                    <Trans i18nKey='pricing.membership_size_title'>How many voters do you need*?</Trans>
                  </Text>
                  <Text fontSize='11px' color='#888'>
                    Calculate added costs per vote
                  </Text>

                  <Flex flexDir='row' flexWrap={'wrap'} gap={4} mt='40px' mb='20px'>
                    <Controller
                      name='censusSize'
                      control={methods.control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <>
                          {[100, 500, 1000, 2500, 5000, 10000].map((value) => (
                            <Button
                              key={value}
                              w='105px'
                              h='68px'
                              flexDir='column'
                              fontSize='20px'
                              fontWeight='600'
                              onClick={() =>
                                field.onChange(censusSizeOptions.find((option) => option.value === value)?.value)
                              }
                              bg={field.value === value ? '#276958' : ''} // Change background color based on the active button
                              color={field.value === value ? 'white' : ''} // Change text color based on active button
                              _hover={{ bg: field.value === value ? 'primary.500' : 'primary.100' }} // Change hover state
                            >
                              {value}
                              <Text fontSize='10px' fontWeight='100' mt='-15px'>
                                voters
                              </Text>
                            </Button>
                          ))}
                        </>
                      )}
                    />
                    <Button w='105px' h='65px' flexDir='column' fontSize='20px' fontWeight='600'>
                      +10000
                      <Text fontSize='10px' fontWeight='100' mt='-15px'>
                        voters
                      </Text>
                    </Button>
                  </Flex>
                </Flex>
                <Flex flex={{ base: '1 1 100%', lg: '0 0 25%' }}>
                  <Text color='#999'>
                    <Trans i18nKey='pricing.membership_description'>
                      *Each plan <strong>includes a default number of voters</strong>, and you can add extra if needed.
                      The voter limit you select defines the maximum nº of participants. For example, if your plan
                      includes 500 voters, you can run elections with up to 500 participants. <br />
                      <br />
                      Need more? <strong>Select the the nº of voters</strong> or upgrade to a higher-tier plan.
                    </Trans>
                  </Text>
                </Flex>
              </Flex>
            </Box>

            {/* PLANS SECTION */}
            <Flex gap={5} justifyContent='space-evenly' alignItems='start' flexWrap='wrap' mt='20px'>
              {cards.map((card, idx) => (
                <PricingCard key={idx} plan={plans[idx]} {...card} featuresRef={featuresRef} />
              ))}
            </Flex>

            {/*
            <Controller
              name='censusSize'
              control={methods.control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  options={censusSizeOptions}
                  onChange={(selected) => field.onChange(selected?.value || null)}
                  value={censusSizeOptions.find((option) => option.value === field.value)}
                />
              )}
            />
            {methods.formState.errors.censusSize && (
              <Text color='red.500' fontSize='sm' mt={1}>
                {t('form.error.field_is_required')}
              </Text>
            )}
            */}

            {/*
              {isLoading && <Progress colorScheme='brand' size='xs' isIndeterminate />}
            */}
          </Flex>
        </form>
      </FormProvider>
      <Box m='40px auto 0px'>
        <Button onClick={handleViewFeatures} w='300px' m='10px auto'>
          <Icon mr={2} as={AddIcon} />
          <Trans i18nKey='pricing_card.view_features'>View All features</Trans>
        </Button>
      </Box>
    </Box>
  )
}

export const SubscriptionModal = ({
  isOpen,
  onClose,
  title,
}: {
  isOpen: boolean
  onClose: () => void
  title?: ReactNode
}) => {
  const { t } = useTranslation()
  const { subscription } = useSubscription()
  const translations = usePlanTranslations()

  if (!subscription) return null

  const plan = translations[subscription.plan.id].title
  const billing = new Date(subscription.subscriptionDetails.renewalDate)
  // the date format used by the billing date
  const format = t('pricing.date_format', { defaultValue: 'dd/mm/yy' })

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant='pricing-modal' size='full'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title || <Trans i18nKey='pricing.upgrade_title'>Upgrade your subscription</Trans>}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SubscriptionPlans />
        </ModalBody>

        <ModalFooter>
          {subscription.plan.id !== PlanId.Free && (
            <Text>
              <Trans i18nKey='pricing.your_plan' values={{ plan, billing, format }} components={{ plan: <PlanText /> }}>
                You're currently subscribed to the {{ plan }} plan. Upgrade now, and you'll only pay the difference for
                the remaining time in your billing period. Starting from your next billing cycle on dd/mm/yy, you'll be
                charged the full price for your new plan.
              </Trans>
            </Text>
          )}
          <Box>
            <Text>
              <Trans i18nKey='pricing.help'>Need some help?</Trans>
            </Text>
            <Button variant='brand' as={ReactRouterLink} to={Routes.contact} target='_blank'>
              <Trans i18nKey='contact_us'>Contact us</Trans>
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const PlanText = ({ children }: { children?: ReactNode }) => (
  <Text as='span' fontWeight='bold' display='inline'>
    "{children}"
  </Text>
)
