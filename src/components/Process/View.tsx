import { WarningIcon } from '@chakra-ui/icons'
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
  Text,
  UnorderedList,
  useDisclosure,
  useMultiStyleConfig,
} from '@chakra-ui/react'
import { ElectionQuestions, ElectionResults, environment, useConfirm } from '@vocdoni/chakra-components'
import { useClient, useElection } from '@vocdoni/react-providers'
import { ElectionResultsTypeNames, PublishedElection } from '@vocdoni/sdk'
import { useEffect, useRef, useState } from 'react'
import { FieldValues } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import ReactPlayer from 'react-player'
import { FacebookShare, RedditShare, TelegramShare, TwitterShare } from '~components/Share'
import Header from './Header'
import VoteButton from './VoteBtn'
import confirmImg from '/assets/spreadsheet-confirm-modal.jpg'
import successImg from '/assets/spreadsheet-success-modal.jpg'

export const ProcessView = () => {
  const { t } = useTranslation()
  const { election } = useElection()
  const videoRef = useRef<HTMLDivElement>(null)
  const [videoTop, setVideoTop] = useState(false)
  const electionRef = useRef<HTMLDivElement>(null)
  const [formErrors, setFormErrors] = useState<any>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const [showResults, setShowResults] = useState(false)

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

  useEffect(() => {
    if (!electionRef.current || !resultsRef.current) return

    const results = resultsRef.current?.children[0].children
    const resultsArray = Array.from(results) as HTMLElement[]

    if (!resultsArray.length) return

    const questions = electionRef.current.children[0].children[0].children
    const questionsArray = Array.from(questions) as HTMLDivElement[]

    questionsArray.forEach((el, i) => {
      const height = el.getBoundingClientRect().height + 4 + 'px'
      resultsArray[i].style.height = height
    })

    const questionsOptions = electionRef.current.querySelectorAll('.chakra-radio-group')
    const questionsOptionsArray = Array.from(questionsOptions) as HTMLElement[]

    questionsOptionsArray.forEach((el, i) => {
      const questionOptionsArray = Array.from(el.children[0].children) as HTMLElement[]

      questionOptionsArray.forEach((el, idx) => {
        const height = el.getBoundingClientRect().height + 'px'
        if (resultsArray[i]?.children[1]?.children[idx]) {
          ;(resultsArray[i].children[1].children[idx] as HTMLElement).style.height = height
        }
      })
    })
  }, [])

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

        {election?.streamUri && (
          <Box
            maxW={{ base: '800px', lg: videoTop ? '400px' : '800px' }}
            ml={videoTop ? 'auto' : 'none'}
            position={{ base: 'unset', lg: 'sticky' }}
            top={{ base: 0, lg2: 20 }}
            zIndex={100}
          >
            <AspectRatio ref={videoRef} ratio={16 / 9}>
              <ReactPlayer url={election?.streamUri} width='100%' height='100%' playing controls />
            </AspectRatio>
          </Box>
        )}
        <Flex display={{ base: 'flex', lg2: 'none' }} justifyContent='end'>
          <Button variant='transparent' onClick={() => setShowResults(!showResults)}>
            {showResults ? 'Hide results' : 'Show results'}
          </Button>
        </Flex>

        <Flex gap={20} position='relative' justifyContent='end' zIndex={10}>
          <Box
            ref={electionRef}
            flexGrow={1}
            flexShrink={1}
            className='md-sizes'
            mb='100px'
            pt='25px'
            onClick={() => setShowResults(false)}
            position='relative'
          >
            <ElectionQuestions
              onInvalid={(args) => {
                setFormErrors(args)
              }}
              confirmContents={(election, answers) => <ConfirmVoteModal election={election} answers={answers} />}
            />
            <Box position='sticky' bottom={0} left={0} zIndex={100}>
              <VoteButton />
            </Box>
          </Box>
          <Box
            ref={resultsRef}
            minW={{ base: 'full', lg2: '300px' }}
            width={{ base: 'full', lg2: '300px' }}
            display={{ base: `${showResults ? 'block' : 'none'}`, lg2: 'block' }}
            position={{ base: 'absolute', lg2: 'relative' }}
            onClick={() => setShowResults(false)}
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
