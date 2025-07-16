import {
  Button,
  Flex,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LuSettings, LuX } from 'react-icons/lu'
import {
  Sidebar,
  SidebarContents,
  SidebarProps,
  SidebarSubtitle,
  SidebarTitle,
} from '~components/shared/Dashboard/Contents'
import { BasicConfig } from './BasicConfig'
import CensusCreation from './CensusCreation'
import { ExtraConfig } from './ExtraConfig'

type CreateSidebarProps = {
  onClose?: () => void
} & SidebarProps

export const CreateSidebar = (props: CreateSidebarProps) => {
  const { t } = useTranslation()
  const isMobile = useBreakpointValue({ base: true, md: false })
  const [showExtraCensusMethods, setShowExtraCensusMethods] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleToggleExtraMethods = () => {
    setShowExtraCensusMethods(!showExtraCensusMethods)
    onClose()
  }

  return (
    <Sidebar {...props}>
      <SidebarContents borderBottom='1px solid' borderColor='table.border'>
        <SidebarTitle>Settings</SidebarTitle>
        {isMobile && (
          <IconButton
            aria-label='Close sidebar'
            icon={<Icon as={LuX} />}
            variant='ghost'
            size='sm'
            position='absolute'
            top={2}
            right={2}
            onClick={() => props.onClose?.()}
            _hover={{ bg: 'gray.100', _dark: { bg: 'whiteAlpha.200' } }}
          />
        )}
      </SidebarContents>

      <SidebarContents flex='1' overflowY='auto'>
        <SidebarSubtitle>Basic Configuration</SidebarSubtitle>
        <BasicConfig />

        <SidebarSubtitle borderTop='1px solid' borderColor='table.border' mt={4}>
          Extra Configuration
        </SidebarSubtitle>
        <ExtraConfig />

        <Flex
          borderTop='1px solid'
          borderColor='table.border'
          mt={4}
          pt={4}
          justifyContent='space-between'
          alignItems='center'
        >
          <SidebarSubtitle m={0}>Census Creation</SidebarSubtitle>
          <IconButton
            aria-label={t('process_create.census.settings', 'Census settings')}
            icon={<Icon as={LuSettings} />}
            variant='ghost'
            size='sm'
            onClick={onOpen}
            _hover={{ bg: 'gray.100', _dark: { bg: 'whiteAlpha.200' } }}
          />
        </Flex>

        <CensusCreation showExtraMethods={showExtraCensusMethods} />

        <Modal isOpen={isOpen} onClose={onClose} size='lg'>
          <ModalOverlay />
          <ModalContent p={5}>
            <ModalHeader p={0}>
              <Flex flexDirection='column' gap={3}>
                <Text fontSize='lg' fontWeight='bold'>
                  {t('process_create.census.extra_methods.modal_title', 'Extra census methods')}
                </Text>
                <Text fontSize='sm' color='texts.subtle'>
                  {showExtraCensusMethods
                    ? t(
                        'process_create.census.extra_methods.disable_description',
                        'Do you want to disable extra census methods? This will hide the Spreadsheet and Web3 options and show only the Group method.'
                      )
                    : t(
                        'process_create.census.extra_methods.enable_description',
                        'Do you want to enable extra census methods? This will show additional options like Spreadsheet and Web3 census creation.'
                      )}
                </Text>
              </Flex>
            </ModalHeader>
            <ModalBody p={0} pt={4}>
              <Flex gap={2} justifyContent='flex-end'>
                <Button variant='ghost' onClick={onClose}>
                  {t('common.cancel', 'Cancel')}
                </Button>
                <Button colorScheme='black' onClick={handleToggleExtraMethods}>
                  {showExtraCensusMethods ? t('common.disable', 'Disable') : t('common.enable', 'Enable')}
                </Button>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </SidebarContents>
    </Sidebar>
  )
}
