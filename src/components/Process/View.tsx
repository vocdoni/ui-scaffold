import { WarningIcon } from '@chakra-ui/icons'
import {
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
  Text,
  UnorderedList,
  useDisclosure,
  useMultiStyleConfig,
} from '@chakra-ui/react'
import { ElectionQuestions, ElectionResults, environment, useConfirm } from '@vocdoni/chakra-components'
import { useClient, useElection } from '@vocdoni/react-providers'
import { ElectionResultsTypeNames, ElectionStatus, PublishedElection } from '@vocdoni/sdk'
import { useEffect, useRef, useState } from 'react'
import { FieldValues } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { useAccount } from 'wagmi'
import { FacebookShare, RedditShare, TelegramShare, TwitterShare } from '~components/Share'
import Header from './Header'
import VoteButton from './VoteBtn'
import confirmImg from '/assets/spreadsheet-confirm-modal.jpg'
import successImg from '/assets/spreadsheet-success-modal.jpg'

export const ProcessView = () => {
  const { isConnected } = useAccount()
  const { election, isAbleToVote, voted, votesLeft, isInCensus } = useElection()
  const electionRef = useRef<HTMLDivElement>(null)
  const [formErrors, setFormErrors] = useState<any>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const [showResults, setShowResults] = useState(false)

  // Check if render results full screen
  const showResultsFullScreen =
    (votesLeft === 0 && isInCensus) ||
    election?.status === ElectionStatus.RESULTS ||
    election?.status === ElectionStatus.ENDED

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

  // To set up dependencies in useEffect to allow recalculating distances when fetching calls of Questions modify the container size
  const electionContainerHeight = electionRef.current?.getBoundingClientRect().height

  useEffect(() => {
    if (isAbleToVote === null || !electionRef.current || !resultsRef.current) return

    // Get and convert results to an array
    const results = resultsRef.current?.children[0].children
    const resultsArray = Array.from(results) as HTMLElement[]

    if (!resultsArray.length) return

    // Check if its we have to show results in full screen
    if (showResultsFullScreen) {
      // Apply results full screen styles
      electionRef.current.style.marginBottom = '0px'
      electionRef.current.style.padding = '0px'
      ;(resultsRef.current.children[0] as HTMLElement).style.gap = '30px'

      //If the election state is results or ended dont show the questions
      if (
        electionRef.current.children[0].children.length === 2 &&
        (election?.status === ElectionStatus.RESULTS || election?.status === ElectionStatus.ENDED)
      ) {
        ;(electionRef.current.children[0].children[0] as HTMLElement).style.display = 'block'
        ;(electionRef.current.children[0].children[1] as HTMLElement).style.display = 'none'
      } else if (election?.status === ElectionStatus.RESULTS || election?.status === ElectionStatus.ENDED) {
        ;(electionRef.current.children[0].children[0] as HTMLElement).style.display = 'none'
      }

      resultsArray.forEach((el) => {
        // Apply results styles container
        ;(el.children[0] as HTMLElement).style.display = 'block'
        ;(el.children[1] as HTMLElement).style.borderTopRightRadius = '0'
        ;(el.children[1] as HTMLElement).style.borderTopLeftRadius = '0'
        ;(el.children[1] as HTMLElement).style.gap = '30px'
        const options = el.children[1].children
        const optionsArray = Array.from(options) as HTMLElement[]
        optionsArray.forEach((el) => {
          if (screen.width >= 1220) {
            // Apply results styles in desktop
            el.style.flexWrap = 'nowrap'
            ;(el.children[0] as HTMLElement).style.display = 'flex'
            ;(el.children[0] as HTMLElement).style.alignItems = 'center'
            ;(el.children[0] as HTMLElement).style.whiteSpace = 'wrap'
            ;(el.children[0] as HTMLElement).style.width = '40%'
            ;(el.children[1] as HTMLElement).style.width = '20%'
            ;(el.children[1] as HTMLElement).style.display = 'flex'
            ;(el.children[1] as HTMLElement).style.justifyContent = 'center'
            ;(el.children[1] as HTMLElement).style.alignItems = 'center'
            ;(el.children[2] as HTMLElement).style.width = '40%'
            ;(el.children[2] as HTMLElement).style.marginTop = 'auto'
            ;(el.children[2] as HTMLElement).style.marginBottom = 'auto'
          }
        })
      })
      // Get and convert questions into an array. Check if there is a 'vote overwritte' alert to get the corresponding parent.
      const questions = voted
        ? electionRef.current.children[0].children[1].children
        : electionRef.current.children[0].children[0].children

      const questionsArray = Array.from(questions) as HTMLDivElement[]

      if (!questions[0]) return

      // get the questions container
      const container = questions[0].parentNode?.parentNode?.parentNode as HTMLElement

      if (!container) return

      // Calculate the difference in distance to the top of the page from the container to the first question
      const relativeHeight = questions[0].getBoundingClientRect().top - container.getBoundingClientRect().top

      // Give each answer container the same height as its corresponding question; add the relativeHeight + padding to the first question
      questionsArray.forEach((el, idx) => {
        const height = el.getBoundingClientRect().height + (idx === 0 ? relativeHeight + 32 : 0) + 'px'
        resultsArray[idx].style.height = height
      })

      // Get and convert results to an array
      const questionsOptions = electionRef.current.querySelectorAll('.chakra-radio-group')
      const questionsOptionsArray = Array.from(questionsOptions) as HTMLElement[]

      // Give each option container of each question the same size as its corresponding option in the relevant question
      questionsOptionsArray.forEach((el, i) => {
        const questionOptionsArray = Array.from(el.children[0].children) as HTMLElement[]

        questionOptionsArray.forEach((el, idx) => {
          const height = el.getBoundingClientRect().height + 'px'
          if (resultsArray[i]?.children[1]?.children[idx]) {
            ;(resultsArray[i].children[1].children[idx] as HTMLElement).style.height = height
          }
        })
      })
    } else {
      // Apply results side styles
      electionRef.current.style.marginBottom = '100px'
      electionRef.current.style.paddingTop = '25px'
      ;(resultsRef.current.children[0] as HTMLElement).style.gap = '95px'
      resultsArray.forEach((el) => {
        ;(el.children[0] as HTMLElement).style.display = 'none'
        ;(el.children[1] as HTMLElement).style.borderTopRightRadius = '8px'
        ;(el.children[1] as HTMLElement).style.borderTopLeftRadius = '8px'
        ;(el.children[1] as HTMLElement).style.gap = '0.5rem'
        const options = el.children[1].children
        const optionsArray = Array.from(options) as HTMLElement[]
        optionsArray.forEach((el) => {
          if (screen.width >= 1220) {
            el.style.flexWrap = 'wrap'
            el.style.height = 'content'
            ;(el.children[0] as HTMLElement).style.whiteSpace = 'nowrap'
            ;(el.children[0] as HTMLElement).style.width = 'calc(100% - 170px)'
            ;(el.children[1] as HTMLElement).style.width = '150px'
            ;(el.children[1] as HTMLElement).style.textAlign = 'end'
            ;(el.children[1] as HTMLElement).style.display = 'block'
            ;(el.children[1] as HTMLElement).style.justifyContent = 'normal'
            ;(el.children[1] as HTMLElement).style.alignItems = 'normal'
            ;(el.children[2] as HTMLElement).style.width = '100%'
            ;(el.children[2] as HTMLElement).style.marginTop = '0px'
            ;(el.children[2] as HTMLElement).style.marginBottom = '0px'
          }
        })
      })

      resultsArray.forEach((el, idx) => {
        el.style.height = 'auto'
        if (idx === resultsArray.length - 1) el.style.marginBottom = '100px'
        const options = el.children[1].children
        const optionsArray = Array.from(options) as HTMLElement[]

        optionsArray.forEach((el) => {
          el.style.height = 'auto'
        })
      })
    }
  }, [isAbleToVote, electionContainerHeight, showResultsFullScreen, isConnected])

  return (
    <Box bgColor='bg_process' outline='100px solid' outlineColor='bg_process'>
      <Box
        position='absolute'
        display={{ base: 'none', xl: 'block' }}
        opacity='0.3'
        width='385px'
        top='350px'
        right='0px'
      >
        <Image src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6436e8ff4a93d8291f122d65_Vector4.png' />
        <Image
          src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6436e915e43ce706c7d17313_Vector5.png'
          position='absolute'
          top='2%'
          bottom='0%'
          left='auto'
          right='9%'
        />
      </Box>
      <Box className='site-wrapper' overflow='hidden'>
        <Header />

        {isAbleToVote && (
          <Flex display={{ base: 'flex', lg2: 'none' }} justifyContent='end'>
            <Button variant='transparent' onClick={() => setShowResults(!showResults)}>
              {showResults ? 'Hide results' : 'Show results'}
            </Button>
          </Flex>
        )}

        <Flex
          gap={showResultsFullScreen ? 0 : 20}
          flexDirection={showResultsFullScreen ? 'column' : 'row'}
          position='relative'
          justifyContent='end'
          zIndex={10}
        >
          <Box
            ref={electionRef}
            flexGrow={1}
            flexShrink={1}
            className='md-sizes'
            mb='100px'
            pt='25px'
            onClick={() => setShowResults(false)}
            position='relative'
            maxW={{ base: 'full', lg2: 'calc(100% - 380px)' }}
          >
            <ElectionQuestions
              onInvalid={(args) => {
                setFormErrors(args)
              }}
              confirmContents={(election, answers) => <ConfirmVoteModal election={election} answers={answers} />}
            />
            {election?.status !== ElectionStatus.RESULTS && (
              <Box position='sticky' bottom={0} left={0} zIndex={100}>
                <VoteButton />
              </Box>
            )}
          </Box>
          <Box
            ref={resultsRef}
            minW={{ base: 'full', lg2: showResultsFullScreen ? 'calc(100% - 380px)' : '300px' }}
            width={{ base: 'full', lg2: showResultsFullScreen ? 'calc(100% - 380px)' : '300px' }}
            display={{ base: `${showResults || !isAbleToVote ? 'block' : 'none'}`, lg2: 'block' }}
            position={{ base: `${showResultsFullScreen ? 'relative' : 'absolute'}`, lg2: 'relative' }}
            onClick={() => setShowResults(showResultsFullScreen)}
          >
            <ElectionResults />
          </Box>
        </Flex>
      </Box>

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

  if (!election || !voted) return null

  const verify = environment.verifyVote(env, voted)
  const url = encodeURIComponent(document.location.href)
  const caption = t('process.share_caption', { title: election?.title.default })

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>{t('process.success_modal.title')}</Text>
          <Box bgImage={successImg} />
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
          <Button onClick={onClose} variant='primary'>
            {t('process.success_modal.btn')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const ConfirmVoteModal = ({ election, answers }: { election: PublishedElection; answers: FieldValues }) => {
  const { t } = useTranslation()
  const styles = useMultiStyleConfig('ConfirmModal')
  const { cancel, proceed } = useConfirm()

  const canAbstain =
    election.resultsType.name === ElectionResultsTypeNames.MULTIPLE_CHOICE && election.resultsType.properties.canAbstain

  return (
    <>
      <ModalHeader>
        <Box bgImage={`url(${confirmImg})`} />
      </ModalHeader>
      <ModalBody display='flex' flexDirection='column' gap={5} p={0} mb={2}>
        <Text>{t('process.spreadsheet.confirm.description')}</Text>
        <Flex
          flexDirection='column'
          maxH='200px'
          overflowY='scroll'
          boxShadow='rgba(128, 128, 128, 0.42) 1px 1px 1px 1px'
          px={2}
          borderRadius='lg2'
        >
          {election.questions.map((q, i) => (
            <Box key={i}>
              <Box py={2}>
                <Text display='flex' flexDirection='column' gap={1} mb={1}>
                  <Trans
                    i18nKey='process.spreadsheet.confirm.question'
                    components={{
                      span: <Text as='span' fontWeight='bold' whiteSpace='nowrap' />,
                    }}
                    values={{
                      answer: q.title.default,
                      number: i + 1,
                    }}
                  />
                </Text>
                {election.resultsType.name === ElectionResultsTypeNames.SINGLE_CHOICE_MULTIQUESTION ? (
                  <Text display='flex' flexDirection='column' gap={1}>
                    <Trans
                      i18nKey='process.spreadsheet.confirm.option'
                      components={{
                        span: <Text as='span' fontWeight='bold' whiteSpace='nowrap' />,
                      }}
                      values={{
                        answer: q.choices[Number(answers[i])].title.default,
                        number: i + 1,
                      }}
                    />
                  </Text>
                ) : (
                  <Text display='flex' flexDirection='column' gap={1}>
                    <Trans
                      i18nKey='process.spreadsheet.confirm.options'
                      components={{
                        span: <Text as='span' fontWeight='bold' whiteSpace='nowrap' />,
                      }}
                      values={{
                        answers:
                          answers[0].length === 0
                            ? t('process.spreadsheet.confirm.blank_vote')
                            : answers[0]
                                .map((a: string) => q.choices[Number(a)].title.default)
                                .map((a: string) => `- ${a}`)
                                .join('<br />'),
                      }}
                    />
                  </Text>
                )}
              </Box>
              {i + 1 !== election.questions.length && <Box h='1px' bgColor='lightgray' />}
            </Box>
          ))}
        </Flex>
        {canAbstain && answers[0].length < election.voteType.maxCount! && (
          <Flex direction={'row'} py={2} gap={2} alignItems={'center'} color={'primary.main'}>
            <WarningIcon />
            <Text display='flex' flexDirection='column' gap={1}>
              {t('process.spreadsheet.confirm.abstain_count', {
                count: election.voteType.maxCount! - answers[0].length,
              })}
            </Text>
          </Flex>
        )}
      </ModalBody>
      <ModalFooter sx={styles.footer}>
        <Button onClick={cancel!} variant='ghost' sx={styles.cancel}>
          {t('cc.confirm.cancel')}
        </Button>
        <Button onClick={proceed!} sx={styles.confirm}>
          {t('cc.confirm.confirm')}
        </Button>
      </ModalFooter>
    </>
  )
}
