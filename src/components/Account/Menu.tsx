// import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
// import {
//   Avatar,
//   Box,
//   BoxProps,
//   Button,
//   Icon,
//   IconButton,
//   Menu,
//   MenuButton,
//   MenuDivider,
//   MenuItem,
//   MenuList,
//   Spinner,
//   useColorMode,
//   useColorModeValue,
// } from '@chakra-ui/react'
// import { LogOut01, Paperclip, UserSquare } from '@untitled-ui/icons-react'
// import { Trans, useTranslation } from 'react-i18next'
// import { FaGlobeAmericas } from 'react-icons/fa'
// import { IoMdMoon, IoMdSunny } from 'react-icons/io'
// import { Link as RouterLink } from 'react-router-dom'
// import { useAuth } from '~components/Auth/useAuth'
// import { LanguagesSlice } from '~i18n/languages.mjs'
// import { useProfile } from '~src/queries/account'
// import { Routes } from '~src/router/routes'

// const AccountMenu: React.FC<BoxProps> = (props) => {
//   const { logout } = useAuth()
//   const { data: profile, isLoading } = useProfile()
//   const { toggleColorMode } = useColorMode()
//   const text = useColorModeValue('Dark Mode', 'Light Mode')
//   const SwitchIcon = useColorModeValue(IoMdMoon, IoMdSunny)
//   const { i18n } = useTranslation()

//   const languages = LanguagesSlice as { [key: string]: string }

//   if (isLoading) {
//     return (
//       <Box {...props}>
//         <Spinner />
//       </Box>
//     )
//   }

//   return (
//     <Box {...props}>
//       <Menu>
//         <MenuButton
//           as={IconButton}
//           icon={
//             <Avatar
//               name={`${profile.firstName} ${profile.lastName}`}
//               src={profile.organizations[0]?.organization.logo || ''}
//               size='sm'
//             />
//           }
//           variant='link'
//           aria-label='User menu'
//         />
//         <MenuList>
//           <MenuItem as={RouterLink} to={Routes.dashboard.profile}>
//             <Icon as={UserSquare} />
//             <Trans i18nKey='profile.title'>Profile</Trans>
//           </MenuItem>
//           <MenuItem as={RouterLink} to='https://developer.vocdoni.io/' target='_blank'>
//             <Icon as={Paperclip} />
//             <Trans i18nKey='menu.documentation'>Documentation</Trans>
//           </MenuItem>
//           <MenuDivider />
//           <MenuItem>
//             <Menu>
//               {({ isOpen }) => (
//                 <>
//                   <MenuButton
//                     isActive={isOpen}
//                     as={Button}
//                     variant='unstyled'
//                     display={'flex'}
//                     alignItems={'center'}
//                     fontSize={'md'}
//                     leftIcon={<FaGlobeAmericas />}
//                     rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
//                   >
//                     Languages
//                   </MenuButton>
//                   <MenuList>
//                     {Object.keys(languages).map((k: string) => (
//                       <MenuItem
//                         key={k}
//                         onClick={() => {
//                           i18n.changeLanguage(k)
//                         }}
//                         closeOnSelect={false}
//                         w='full'
//                         display='flex'
//                         // justifyContent={closeOnSelect ? 'center' : 'start'}
//                         fontWeight={k === i18n.language ? 'extrabold' : ''}
//                         borderRadius='none'
//                       >
//                         {k.toUpperCase()}
//                       </MenuItem>
//                     ))}
//                   </MenuList>
//                 </>
//               )}
//             </Menu>
//           </MenuItem>
//           <MenuItem onClick={toggleColorMode}>
//             <Icon as={SwitchIcon} />
//             <Trans>{text}</Trans>
//           </MenuItem>
//           <MenuDivider />
//           <MenuItem onClick={logout}>
//             <Icon as={LogOut01} />
//             <Trans i18nKey='logout'>Logout</Trans>
//           </MenuItem>
//           <MenuDivider />
//           <MenuItem fontSize={'xs'} as={RouterLink} to={Routes.terms}>
//             <Trans i18nKey='menu.terms'>Terms</Trans>
//           </MenuItem>
//           <MenuItem fontSize={'xs'} as={RouterLink} to={Routes.privacy}>
//             <Trans i18nKey='menu.privacy'>Privacy</Trans>
//           </MenuItem>
//         </MenuList>
//       </Menu>
//     </Box>
//   )
// }

// export default AccountMenu

import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  BoxProps,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { LogOut01, Paperclip, UserSquare } from '@untitled-ui/icons-react'
import { Trans, useTranslation } from 'react-i18next'
import { FaGlobeAmericas } from 'react-icons/fa'
import { IoMdMoon, IoMdSunny } from 'react-icons/io'
import { Link as RouterLink } from 'react-router-dom'
import { useAuth } from '~components/Auth/useAuth'
import { LanguagesSlice } from '~i18n/languages.mjs'
import { useProfile } from '~src/queries/account'
import { Routes } from '~src/router/routes'

const AccountMenu: React.FC<BoxProps> = (props) => {
  const { logout } = useAuth()
  const { data: profile, isLoading } = useProfile()
  const { toggleColorMode } = useColorMode()
  const isLightMode = useColorModeValue(true, false)
  const SwitchIcon = useColorModeValue(IoMdMoon, IoMdSunny)

  if (isLoading) {
    return (
      <Box {...props}>
        <Spinner />
      </Box>
    )
  }

  return (
    <Box {...props}>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              as={Button}
              leftIcon={
                <Avatar
                  name={`${profile.firstName} ${profile.lastName}`}
                  src={profile.organizations[0]?.organization.logo || ''}
                  size='sm'
                />
              }
              rightIcon={isOpen ? <ChevronUpIcon boxSize={7} /> : <ChevronDownIcon boxSize={7} />}
              aria-label='User menu'
              sx={{ '& > span': { m: 0 } }}
              display={'flex'}
              alignItems={'center'}
              variant={'unstyled'}
            />
            <MenuList>
              <MenuItem as={RouterLink} to={Routes.dashboard.profile} closeOnSelect={true}>
                <Icon as={UserSquare} />
                <Trans i18nKey='profile.title'>Profile</Trans>
              </MenuItem>
              <MenuItem as={RouterLink} to='https://developer.vocdoni.io/' target='_blank' closeOnSelect={true}>
                <Icon as={Paperclip} />
                <Trans i18nKey='menu.documentation'>Documentation</Trans>
              </MenuItem>
              <MenuDivider />
              <MenuItem closeOnSelect={false}>
                <AccordionLanguages />
              </MenuItem>
              <MenuItem onClick={toggleColorMode} closeOnSelect={true}>
                <Icon as={SwitchIcon} />
                <Trans i18nKey={isLightMode ? 'dark_mode' : 'light_mode'}></Trans>
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={logout} closeOnSelect={true}>
                <Icon as={LogOut01} />
                <Trans i18nKey='logout'>Logout</Trans>
              </MenuItem>
              <MenuDivider />
              <MenuItem fontSize={'xs'} as={RouterLink} to={Routes.terms} closeOnSelect={true}>
                <Trans i18nKey='menu.terms'>Terms</Trans>
              </MenuItem>
              <MenuItem fontSize={'xs'} as={RouterLink} to={Routes.privacy} closeOnSelect={true}>
                <Trans i18nKey='menu.privacy'>Privacy</Trans>
              </MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
    </Box>
  )
}

export default AccountMenu

const AccordionLanguages = () => {
  const { i18n } = useTranslation()

  const languages = LanguagesSlice as { [key: string]: string }

  return (
    <Accordion allowMultiple m={0} p={0} borderColor='transparent'>
      <AccordionItem>
        <AccordionButton
          as={Button}
          variant='unstyled'
          m={0}
          p={0}
          h='fit-content'
          _hover={{ bgColor: 'transparent' }}
          display={'flex'}
          alignItems={'center'}
          fontSize={'md'}
          leftIcon={<FaGlobeAmericas />}
        >
          <Trans i18nKey={'languages'}>Languages</Trans>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pl={7} pb={0}>
          {Object.keys(languages).map((k: string) => (
            <Text
              key={k}
              onClick={() => {
                i18n.changeLanguage(k)
              }}
              w='full'
              display='flex'
              fontWeight={k === i18n.language ? 'extrabold' : ''}
              borderRadius='none'
            >
              {k.toUpperCase()}
            </Text>
          ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
