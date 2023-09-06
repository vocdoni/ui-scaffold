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
import { FaFacebook, FaTelegram, FaTwitter } from 'react-icons/fa'
import ProcessAside from './Aside'
import Header from './Header'
import successImg from '/assets/success.png'

export const ProcessView = () => {
  const { t } = useTranslation()
  const { election } = useElection()

  const [tabIndex, setTabIndex] = useState(0)

  const handleTabsChange = (index: number) => {
    setTabIndex(index)
  }

  useEffect(() => {
    if (election?.status === ElectionStatus.RESULTS) setTabIndex(1)
  }, [election])

  return (
    <>
      <Box>
        <Header />
        <Flex direction={{ base: 'column', xl: 'row' }} gap={{ xl: 10 }} alignItems='start'>
          <Tabs variant='process' index={tabIndex} onChange={handleTabsChange} flexGrow={1} w='full'>
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
            justifyContent='center'
            position='sticky'
            bottom={{ base: 'px', xl: undefined }}
            top={{ xl: 20 }}
            mx='auto'
            mt={{ xl: 10 }}
          >
            <ProcessAside />
          </Flex>
        </Flex>
      </Box>
      <SuccessVoteModal />
    </>
  )
}

const SuccessVoteModal = () => {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { votesLeft, election, voted } = useElection()
  const { env } = useClient()

  const [vLeft, setVLeft] = useState<number | undefined>(undefined)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (votesLeft === -1) {
      setIsInitialized(true)
    } else if (isInitialized && !vLeft) {
      setVLeft(votesLeft)
    }

    if (vLeft && votesLeft < vLeft) {
      setVLeft(votesLeft)
      onOpen()
    }
  }, [votesLeft])

  if (!election || !voted) return null

  const encodedTitle = encodeURIComponent(election?.title.default)
  const url = environment.verifyVote(env, voted)

  const twitterShareLink = `https://twitter.com/intent/tweet?text=${encodedTitle}-${url}`
  const facebookShareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}&t=${encodedTitle}`
  const telegramShareLink = `https://t.me/share/url?url=${url}&text=${encodedTitle}`

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent px={12}>
        <ModalHeader px={0}>
          <Text textAlign='center' fontSize='lg' mb={3}>
            Vote successfull!
          </Text>
          <Image src={successImg} borderRadius='lg' />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p={0}>
          <Trans
            i18nKey='process.success_modal.text'
            components={{
              customLink: <Link variant='primary' href='' target='_blank' />,
              p: <Text mb={2} />,
            }}
          />
          <UnorderedList listStyleType='none' display='flex' justifyContent='center' gap={6} mt={6} mb={2} ml={0}>
            <ListItem>
              <Link href={twitterShareLink} target='_blank' rel='noopener noreferrer' variant='button-ghost'>
                <Icon as={FaTwitter} w={6} h={6} cursor='pointer' />
              </Link>
            </ListItem>
            <ListItem>
              <Link href={facebookShareLink} target='_blank' rel='noopener noreferrer' variant='button-ghost'>
                <Icon as={FaFacebook} w={6} h={6} cursor='pointer' />
              </Link>
            </ListItem>
            <ListItem>
              <Link href={telegramShareLink} target='_blank' rel='noopener noreferrer' variant='button-ghost'>
                <Icon as={FaTelegram} w={6} h={6} cursor='pointer' />
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
