import {
  Box,
  Button,
  Flex,
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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react'
import { ElectionQuestions, ElectionResults, environment } from '@vocdoni/chakra-components'
import { useClient, useElection } from '@vocdoni/react-providers'
import { ElectionStatus } from '@vocdoni/sdk'
import { useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { FaFacebook, FaReddit, FaTelegram, FaTwitter } from 'react-icons/fa'
import ProcessAside, { ProcessAsideBodyMbl, ProcessAsideFooterMbl } from './Aside'
import Header from './Header'
import successImg from '/assets/success.png'

export const ProcessView = () => {
  const { t } = useTranslation()
  const { election } = useElection()

  const [tabIndex, setTabIndex] = useState(0)

  const handleTabsChange = (index: number) => {
    setTabIndex(index)
  }

  const setQuestionsTab = () => setTabIndex(0)

  useEffect(() => {
    if (election?.status === ElectionStatus.RESULTS) setTabIndex(1)
  }, [election])

  return (
    <>
      <Box px={{ base: 2, sm: 4 }}>
        <Header />
        <Flex display={{ base: 'block', xl: 'none' }} mb={5}>
          <ProcessAsideBodyMbl setQuestionsTab={setQuestionsTab} />
        </Flex>
        <Flex direction={{ base: 'column', xl: 'row' }} gap={{ xl: 10 }} alignItems='start'>
          <Tabs
            variant='process'
            index={tabIndex}
            onChange={handleTabsChange}
            flexGrow={0}
            flexShrink={0}
            flexBasis={{ base: '100%', xl: '75%' }}
            w='full'
          >
            <TabList>
              <Tab>{t('process.questions')}</Tab>
              {election?.status !== ElectionStatus.CANCELED && <Tab>{t('process.results')}</Tab>}
            </TabList>
            <TabPanels>
              <TabPanel>
                <ElectionQuestions />
              </TabPanel>
              <TabPanel mb={20}>
                <ElectionResults />
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Flex
            display={{ base: 'none', xl: 'block' }}
            w='full'
            justifyContent='center'
            position='sticky'
            top={20}
            mt={10}
          >
            <ProcessAside setQuestionsTab={setQuestionsTab} />
          </Flex>
        </Flex>
      </Box>
      <Flex
        display={{ base: 'block', xl: 'none' }}
        w='100%'
        minH='100px'
        position='fixed'
        // border='1px solid red'
        left={0}
        bottom='-25px'
      >
        <ProcessAsideFooterMbl setQuestionsTab={setQuestionsTab} />
      </Flex>
      <SuccessVoteModal />
    </>
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
  }, [votesLeft, vLeft])

  if (!election || !voted) return null

  const verify = environment.verifyVote(env, voted)
  const url = encodeURIComponent(document.location.href)
  const caption = t('process.share_caption', { title: election?.title.default })
  const linked = encodeURIComponent(`${caption} — ${document.location.href}`)

  const twitter = `https://twitter.com/intent/tweet?text=${linked}`
  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${url}`
  const telegram = `https://t.me/share/url?url=${url}&text=${caption}`
  const reddit = `https://reddit.com/submit?url=${url}&title=${caption}`

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent px={12}>
        <ModalHeader px={0}>
          <Text textAlign='center' fontSize='lg' mb={3}>
            {t('process.success_modal.title')}
          </Text>
          <Image src={successImg} borderRadius='lg' />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p={0}>
          <Trans
            i18nKey='process.success_modal.text'
            components={{
              verify: <Link variant='primary' href={verify} target='_blank' />,
              p: <Text mb={2} />,
            }}
          />
          <UnorderedList listStyleType='none' display='flex' justifyContent='center' gap={6} mt={6} mb={2} ml={0}>
            <ListItem>
              <Link
                href={twitter}
                target='_blank'
                title={t('process.share_title', { network: 'twitter' })}
                rel='noopener noreferrer'
                variant='button-ghost'
              >
                <Icon as={FaTwitter} w={6} h={6} cursor='pointer' />
              </Link>
            </ListItem>
            <ListItem>
              <Link
                href={facebook}
                target='_blank'
                title={t('process.share_title', { network: 'facebook' })}
                rel='noopener noreferrer'
                variant='button-ghost'
              >
                <Icon as={FaFacebook} w={6} h={6} cursor='pointer' />
              </Link>
            </ListItem>
            <ListItem>
              <Link
                href={telegram}
                target='_blank'
                title={t('process.share_title', { network: 'telegram' })}
                rel='noopener noreferrer'
                variant='button-ghost'
              >
                <Icon as={FaTelegram} w={6} h={6} cursor='pointer' />
              </Link>
            </ListItem>
            <ListItem>
              <Link
                href={reddit}
                target='_blank'
                title={t('process.share_title', { network: 'reddit' })}
                rel='noopener noreferrer'
                variant='button-ghost'
              >
                <Icon as={FaReddit} w={6} h={6} cursor='pointer' />
              </Link>
            </ListItem>
          </UnorderedList>
        </ModalBody>

        <ModalFooter justifyContent='center'>
          <Button variant='rounded' colorScheme='primary' px={16} onClick={onClose}>
            {t('process.success_modal.btn')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
