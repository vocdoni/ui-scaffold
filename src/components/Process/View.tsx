import {
  AspectRatio,
  Box,
  Button,
  Flex,
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
  UnorderedList,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { ElectionQuestions, ElectionResults, environment } from '@vocdoni/chakra-components'
import { useClient, useElection } from '@vocdoni/react-providers'
import { ElectionStatus, PublishedElection } from '@vocdoni/sdk'
import { useEffect, useRef, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import ReactPlayer from 'react-player'
import { FacebookShare, RedditShare, TelegramShare, TwitterShare } from '~components/Share'
import ProcessAside, { VoteButton } from './Aside'
import { ConfirmVoteModal } from './ConfirmVoteModal'
import Header from './Header'
import successImg from '/assets/spreadsheet-success-modal.jpg'

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
    <Box position='relative' mb={{ base: 10, md: 20 }}>
      <Box>
        <Header />

        {election instanceof PublishedElection && election?.streamUri && (
          <Box
            maxW={{ base: '800px', lg: videoTop ? '400px' : '800px' }}
            ml={videoTop ? 'auto' : 'none'}
            position={{ base: 'unset', lg: 'sticky' }}
            top={{ base: 0, xl2: 20 }}
            zIndex={100}
          >
            <AspectRatio ref={videoRef} ratio={16 / 9}>
              <ReactPlayer url={election?.streamUri} width='100%' height='100%' playing controls />
            </AspectRatio>
          </Box>
        )}

        <Flex
          direction={{ base: 'column', xl2: 'row' }}
          alignItems='start'
          gap={{ base: 6, lg: 12, xl: 20 }}
          mt={6}
          mt={{ base: 20 }}
        >
          <Tabs
            isFitted
            order={{ base: 2, xl2: 1 }}
            index={tabIndex}
            onChange={handleTabsChange}
            flex={{ xl2: '0 0 75%' }}
            w='full'
          >
            <TabList>
              <Tab>{t('process.questions')}</Tab>
              {election instanceof PublishedElection && election?.status !== ElectionStatus.CANCELED && (
                <Tab>{t('process.results')}</Tab>
              )}
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box ref={electionRef}>
                  <ElectionQuestions
                    onInvalid={(args) => {
                      setFormErrors(args)
                    }}
                    confirmContents={(election, answers) => <ConfirmVoteModal election={election} answers={answers} />}
                  />
                </Box>
                <Box
                  position='sticky'
                  bottom={0}
                  left={0}
                  pb={1}
                  pt={1}
                  display={{ base: 'none', xl2: 'block' }}
                  color='red'
                >
                  <VoteButton setQuestionsTab={setQuestionsTab} />
                </Box>
              </TabPanel>
              <TabPanel>
                <ElectionResults />
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Flex
            flexGrow={{ xl2: 1 }}
            flexDirection='column'
            alignItems={{ base: 'center', xl2: 'start' }}
            order={{ base: 1, xl2: 2 }}
            gap={0}
            mx={{ base: 'auto', xl2: 0 }}
            position={{ xl2: 'sticky' }}
            top={'300px'}
            mt={1}
            maxW={{ xl2: '290px' }}
            mb={10}
          >
            <ProcessAside />
          </Flex>
        </Flex>
      </Box>
      <Box position='sticky' bottom={0} left={0} pt={1} display={{ base: 'block', xl2: 'none' }}>
        <VoteButton setQuestionsTab={setQuestionsTab} />
      </Box>
      <VotingVoteModal />
      <SuccessVoteModal />
    </Box>
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
