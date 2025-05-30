import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Tab,
  TabList,
  Tabs,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Routes } from '~routes'
import { ParticipantsCsvManager } from './ParticipantsCsvManager'

const DrawerExample = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  const methods = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <>
      <Button ref={btnRef} onClick={onOpen}>
        Open
      </Button>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef} size='md'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Import Members</DrawerHeader>
          <DrawerBody>
            <FormProvider {...methods}>
              <Box as='form' id='testing-this' onSubmit={methods.handleSubmit(onSubmit)}>
                <ParticipantsCsvManager />
              </Box>
              <Button type='submit' colorScheme='black' ml='auto' form='testing-this' w='200px'>
                Submit
              </Button>
            </FormProvider>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export const Memberbase = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const methods = useForm()

  const menuItems = [
    { label: t('memberbase.members', { defaultValue: 'Members' }), route: Routes.dashboard.memberbase.members },
    { label: t('memberbase.groups', { defaultValue: 'Groups' }), route: Routes.dashboard.memberbase.groups },
  ]
  const currentTabIndex = menuItems.findIndex((item) => location.pathname.endsWith(item.route))

  return (
    <>
      <Heading size='md' fontWeight='extrabold'>
        {t('memberbase.title', {
          defaultValue: 'Memberbase',
        })}
      </Heading>
      <Text mb={4} color='gray.500'>
        {t('memberbase.subtitle', {
          defaultValue: "Manage your organization's members and create censuses",
        })}
      </Text>
      <DrawerExample />
      <Tabs
        variant='settings'
        index={currentTabIndex === -1 ? 0 : currentTabIndex}
        onChange={(index) => {
          const item = menuItems[index]
          navigate(item.route)
        }}
      >
        <TabList mb={6}>
          {menuItems.map((item, index) => (
            <Tab key={index}>{item.label}</Tab>
          ))}
        </TabList>
        <Outlet />
      </Tabs>
    </>
  )
}
