import { WarningIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  Link,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
  UnorderedList,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { ElectionQuestions, ElectionResults, environment } from '@vocdoni/chakra-components'
import { useClient, useElection, useOrganization } from '@vocdoni/react-providers'
import { CensusType, ElectionStatus, PublishedElection } from '@vocdoni/sdk'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { FacebookShare, RedditShare, TelegramShare, TwitterShare } from '~components/Share'
import { ActionsMenu } from './ActionsMenu'
import ProcessAside, { VoteButton } from './Aside'
import { ConfirmVoteModal } from './ConfirmVoteModal'
import { CreatedBy } from './CreatedBy'
import { ElectionVideo } from './Dashboard/ProcessView'
import { ProcessDate } from './Date'
import Header from './Header'
import successImg from '/assets/spreadsheet-success-modal.jpg'

type CensusInfo = { size: number; weight: bigint; type: CensusType }

type ProcessInfoCardProps = {
  label: string
  description?: ReactNode
} & React.ComponentProps<typeof Box>

export const ProcessInfoCard = ({ label, description, ...props }: ProcessInfoCardProps) => {
  return (
    <Box {...props}>
      <Text fontWeight='bold' mb={1}>
        {label}
      </Text>
      {typeof description === 'string' ? (
        <Text color='texts.subtle' size='sm'>
          {description}
        </Text>
      ) : (
        description
      )}
    </Box>
  )
}

const ProcessInfoPanel = () => {
  const { t } = useTranslation()
  const { election } = useElection()
  const { organization, loaded } = useOrganization()
  const { account, client } = useClient()
  const [censusInfo, setCensusInfo] = useState<CensusInfo>()

  // Get the census info to show the total size if the maxCensusSize is less than the total size
  useEffect(() => {
    ;(async () => {
      try {
        if (!client || !(election instanceof PublishedElection) || !election?.census?.censusId) return
        const censusInfo: CensusInfo = await client.fetchCensusInfo(election.census.censusId)
        setCensusInfo(censusInfo)
      } catch (e) {
        // If the census info is not available, just ignore it
        setCensusInfo(undefined)
      }
    })()
  }, [election, client])

  if (!(election instanceof PublishedElection)) return null

  const showOrgInformation = !loaded || (loaded && organization?.account?.name)
  const showTotalCensusSize = censusInfo?.size && election?.maxCensusSize && election.maxCensusSize < censusInfo.size

  return (
    <Flex
      border='1px solid'
      borderColor='table.border'
      borderRadius='md'
      p={4}
      flexDirection='column'
      flexWrap='wrap'
      gap={4}
      h='fit-content'
      flex='0 0 360px'
      minW='360px'
    >
      <Box flexDir='row' display='flex' justifyContent='space-between' w={{ xl2: 'full' }}>
        {election?.status !== ElectionStatus.CANCELED ? (
          <ProcessDate />
        ) : (
          <Text color='process.canceled' fontWeight='bold'>
            {t('process.status.canceled')}
          </Text>
        )}
        <ActionsMenu />
      </Box>
      {election?.electionType.anonymous && (
        <ProcessInfoCard label={t('process.is_anonymous.title')} description={t('process.is_anonymous.description')} />
      )}
      <ProcessInfoCard
        help='cursor'
        label={t('process.census')}
        description={
          showTotalCensusSize ? (
            <Tooltip
              hasArrow
              bg='primary.600'
              color='white'
              placement='top'
              label={t('process.total_census_size_tooltip', {
                censusSize: censusInfo?.size,
                maxCensusSize: election?.maxCensusSize,
                percent:
                  censusInfo?.size && election?.maxCensusSize
                    ? Math.round((election?.maxCensusSize / censusInfo?.size) * 100)
                    : 0,
              })}
            >
              <Text>
                {t('process.total_census_size', {
                  censusSize: censusInfo?.size,
                  maxCensusSize: election?.maxCensusSize,
                })}
              </Text>
            </Tooltip>
          ) : (
            <Text color='texts.subtle' size='sm'>
              {t('process.people_in_census', { count: election?.maxCensusSize })}
            </Text>
          )
        }
      />
      {showOrgInformation && <ProcessInfoCard label={t('process.created_by')} description={<CreatedBy />} />}
      {election?.status === ElectionStatus.PAUSED && election?.organizationId !== account?.address && (
        <Flex
          color='process.paused'
          _dark={{ color: 'white' }}
          gap={2}
          alignItems='center'
          border='1px solid'
          borderColor='process.paused'
          borderRadius='lg'
          p={2}
        >
          <Icon as={WarningIcon} />
          <ProcessInfoCard label={t('process.status.paused')} description={t('process.status.paused_description')} />
        </Flex>
      )}
    </Flex>
  )
}

export const ProcessView = () => {
  const { t } = useTranslation()
  const { election } = useElection()
  const videoRef = useRef<HTMLDivElement>(null)
  const [videoTop, setVideoTop] = useState(false)
  const electionRef = useRef<HTMLDivElement>(null)
  const [tabIndex, setTabIndex] = useState(0)
  const [formErrors, setFormErrors] = useState<any>(null)

  const handleTabsChange = (index: number) => {
    setTabIndex(index)
  }

  const setQuestionsTab = () => setTabIndex(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!videoRef.current) return

      const rect = videoRef.current.getBoundingClientRect()
      if (rect.top <= 84) {
        setVideoTop(true)
      } else {
        setVideoTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // If the election is finished show the results tab
  useEffect(() => {
    if (election instanceof PublishedElection && election?.status === ElectionStatus.RESULTS) {
      setTabIndex(1)
    }
  }, [election])

  // Move the focus of the screen to the first unanswered question
  useEffect(() => {
    if (!formErrors) return

    // We gather all the inputs
    const inputs = electionRef?.current?.getElementsByTagName('input')

    if (inputs) {
      const inputsArray = Array.from(inputs)

      // The formErrors object has keys that represent the error names, so we filter the inputsArray with the names of the inputs
      const inputsError = inputsArray.filter((el) => el.name === Object.keys(formErrors)[0])

      // We get the last input which is the closest to the error message
      const lastInputError = inputsError[inputsError.length - 1]

      // Once we have the first input, we calculate the new position
      const newPosition = window.scrollY + lastInputError.getBoundingClientRect().top - 200

      // We move the focus to the corresponding height
      window.scrollTo({
        top: newPosition,
        behavior: 'smooth',
      })
    }
  }, [formErrors])

  return (
    <Grid templateColumns={{ base: '1fr', xl: 'minmax(0,1fr) 360px' }} gap={6} alignItems='start' mx='auto'>
      <GridItem>
        <Box>
          <Header />

          <ElectionVideo
            ref={videoRef}
            maxW={{ base: '800px', lg: videoTop ? '400px' : '800px' }}
            ml={videoTop ? 'auto' : 'none'}
            position={{ base: 'unset', lg: 'sticky' }}
            top={{ base: 0, xl2: 20 }}
            zIndex={100}
          />

          <Tabs
            isFitted
            order={{ base: 2, xl2: 1 }}
            index={tabIndex}
            onChange={handleTabsChange}
            flex={{ xl2: '0 0 75%' }}
            w='full'
          >
            <TabList w='full'>
              <Tab>{t('process.questions')}</Tab>
              {election instanceof PublishedElection && election?.status !== ElectionStatus.CANCELED && (
                <Tab>{t('process.results')}</Tab>
              )}
            </TabList>
            <TabPanels mt={6}>
              <TabPanel p={0}>
                <Box ref={electionRef} p={6} mt={6} border='1px solid' borderColor='table.border' borderRadius='md'>
                  <ElectionQuestions
                    onInvalid={(args) => {
                      setFormErrors(args)
                    }}
                    confirmContents={(election, answers) => <ConfirmVoteModal election={election} answers={answers} />}
                    sx={{
                      '& form': {
                        p: 0,
                        m: 0,

                        /* Title & subtitle */
                        '& .chakra-form-control > div:first-of-type > label': {
                          fontSize: 'lg',
                          fontWeight: 'semibold',
                        },
                        '& .chakra-form-control .chakra-text:first-of-type': { fontSize: 'sm', color: 'texts.subtle' },

                        /* Unified card style for Radio & Checkbox options */
                        '& :is(.chakra-radio-group .chakra-radio, .chakra-checkbox)': {
                          display: 'flex',
                          border: '1px solid',
                          borderColor: 'table.border',
                          borderRadius: 'lg',
                          px: 2,
                          py: 3,
                          cursor: 'pointer',
                        },

                        /* Spacing between adjacent option cards */
                        '& :is(.chakra-radio-group .chakra-radio, .chakra-checkbox) + :is(.chakra-radio, .chakra-checkbox)':
                          { mt: 3 },

                        /* Remove selected background and border */
                        '& :is(.chakra-radio .chakra-radio__label, .chakra-checkbox .chakra-checkbox__label)': {
                          bg: 'transparent',
                          border: 0,
                        },
                        '& :is(.chakra-radio__label, .chakra-checkbox__label) .chakra-text:first-of-type': {
                          fontSize: 'md',
                          fontWeight: 'semibold',
                        },

                        /* No label background when checked */
                        '& :is(.chakra-radio[data-checked] .chakra-radio__label, .chakra-checkbox[data-checked] .chakra-checkbox__label)':
                          { bg: 'transparent !important' },

                        /* Control icon size (dot/square) */
                        '& :is(.chakra-radio__control, .chakra-checkbox__control)': { boxSize: 6 },

                        /* Remove duplicate check icon for checkbox */
                        '& .chakra-checkbox .chakra-checkbox__control svg': { display: 'none !important' },
                      },
                    }}
                  />
                </Box>
                <Box position='sticky' bottom={0} left={0} pb={1} pt={1} display={{ base: 'none', xl2: 'block' }}>
                  <VoteButton setQuestionsTab={setQuestionsTab} />
                </Box>
              </TabPanel>
              <TabPanel p={0}>
                <Box p={6} border='1px solid' borderColor='table.border' borderRadius='md'>
                  <ElectionResults />
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </GridItem>
      <GridItem display='grid' gap={6}>
        <ProcessInfoPanel />
        <ProcessAside />
      </GridItem>
      <VotingVoteModal />
      <SuccessVoteModal />
    </Grid>
  )
}

const SuccessVoteModal = () => {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { votesLeft, election, voted } = useElection()
  const { env } = useClient()

  const [vLeft, setVLeft] = useState<number>(0)

  useEffect(() => {
    if (!vLeft && votesLeft >= 0) {
      setVLeft(votesLeft)
    }

    if (vLeft && votesLeft < vLeft) {
      setVLeft(votesLeft)
      onOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [votesLeft, vLeft])

  if (!election || !voted || !(election instanceof PublishedElection)) return null

  const verify = environment.verifyVote(env, voted)
  const url = encodeURIComponent(document.location.href)
  const caption = t('process.share_caption', { title: election?.title.default })

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text mb={3}>{t('process.success_modal.title')}</Text>
          <Image src={successImg} borderRadius={'lg'} />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Trans
            i18nKey='process.success_modal.text'
            components={{
              verify: <Link href={verify} target='_blank' />,
              p: <Text mb={2} />,
            }}
          />
          <UnorderedList listStyleType='none' display='flex' justifyContent='center' gap={6} mt={6} mb={2} ml={0}>
            <ListItem>
              <TwitterShare url={url} caption={caption} />
            </ListItem>
            <ListItem>
              <FacebookShare url={url} caption={caption} />
            </ListItem>
            <ListItem>
              <TelegramShare url={url} caption={caption} />
            </ListItem>
            <ListItem>
              <RedditShare url={url} caption={caption} />
            </ListItem>
          </UnorderedList>
        </ModalBody>

        <ModalFooter mt={4}>
          <Button onClick={onClose}>{t('process.success_modal.btn')}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const VotingVoteModal = () => {
  const { t } = useTranslation()
  const {
    loading: { voting },
  } = useElection()

  return (
    <Modal isOpen={voting} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent p='30px !important'>
        <ModalBody>
          <VStack>
            <Spinner color='process.spinner' mb={5} w={10} h={10} />
          </VStack>
          <Text textAlign='center'>{t('process.voting')}</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
