import {
    Box,
    Button,
    Flex,
    Icon,
    IconButton,
    Link,
    ListItem,
    OrderedList,
    Text,
    useBreakpointValue,
    useDisclosure,
  } from '@chakra-ui/react'
  import { ChevronRight, HelpCircle, LayoutRight, Plus } from '@untitled-ui/icons-react'
  import { OrganizationProvider, useClient } from '@vocdoni/react-providers'
  import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'
  import { Trans, useTranslation } from 'react-i18next'
  import { generatePath, Outlet, Link as ReactRouterLink } from 'react-router-dom'
  import DashboardMenu from '~components/Dashboard/Menu'
  import { PricingModalProvider } from '~components/Pricing/PricingModalProvider'
  import { Routes } from '~routes'
  
const MenuTop = () =>
<Box
  position={'sticky'}
  bgColor='white'
  top={0}
  px={4}
  gap={4}
  display='flex'
  h={16}
  flexShrink={0}
  alignItems='center'
  borderBottom='var(--border)'
  zIndex={100}
>
  <IconButton
    icon={<LayoutRight />}
    aria-label='Open menu'
    variant={'transparent'}
    colorScheme='gray'
    size={'xs'}
    onClick={isMobile ? onOpen : () => setReduced((prev) => !prev)}
  />

  <Box borderRight={'var(--border)'} h={6} />

  <Box as='nav'>
    <OrderedList display={'flex'} alignItems={'center'} gap={1.5} styleType={"''"} ml={0}>
      {!!breadcrumb.length ? (
        <>
          <ListItem display={{ base: 'none', md: 'block' }}>
            <Link
              as={ReactRouterLink}
              to={generatePath(Routes.dashboard.base)}
              variant={'breadcrumb'}
              fontSize={'sm'}
              onClick={() => setBreadcrumb([])}
            >
              {t('organization.dashboard')}
            </Link>
          </ListItem>
          <ListItem
            display={{ base: 'none', md: 'flex' }}
            justifyContent={'center'}
            alignItems={'center'}
            fontSize={'sm'}
          >
            <Icon as={ChevronRight} />
          </ListItem>
        </>
      ) : (
        <ListItem display={{ base: 'none', md: 'block' }}>{t('organization.dashboard')}</ListItem>
      )}
      {breadcrumb.map((el, index) => (
        <React.Fragment key={index}>
          <ListItem display={{ base: index === breadcrumb.length - 1 ? 'block' : 'none', md: 'block' }}>
            {index === breadcrumb.length - 1 ? (
              <Text as='span' fontSize='sm'>
                {el.title}
              </Text>
            ) : (
              <Link as={ReactRouterLink} to={generatePath(el.route)} variant='breadcrumb' fontSize='sm'>
                {el.title}
              </Link>
            )}
          </ListItem>
          {index < breadcrumb.length - 1 && (
            <ListItem display={{ base: 'none', md: 'flex' }} justifyContent='center' alignItems='center'>
              <Icon as={ChevronRight} />
            </ListItem>
          )}
        </React.Fragment>
      ))}
    </OrderedList>
  </Box>

  <Flex gap={2} ml='auto' alignItems={'center'}>
    <Button
      as={ReactRouterLink}
      to={generatePath(Routes.processes.create)}
      leftIcon={<HelpCircle />}
      colorScheme='gray'
      size={'sm'}
      display={{ base: 'none', lg: 'flex' }}
    >
      <Trans i18nKey='help'>{t('help', { defaultValue: 'Do you need help?' })}</Trans>
    </Button>
    <IconButton
      icon={<HelpCircle />}
      as={ReactRouterLink}
      to={generatePath(Routes.processes.create)}
      colorScheme='gray'
      size={'sm'}
      aria-label='help'
      display={{ base: 'flex', lg: 'none' }}
    />
    <Button
      as={ReactRouterLink}
      to={generatePath(Routes.processes.create)}
      leftIcon={<Plus />}
      colorScheme='black'
      size={'sm'}
      display={{ base: 'none', lg: 'flex' }}
    >
      <Trans i18nKey='new_voting'>New vote</Trans>
    </Button>
    <IconButton
      icon={<Plus />}
      as={ReactRouterLink}
      to={generatePath(Routes.processes.create)}
      colorScheme='black'
      size={'sm'}
      aria-label='new vote'
      display={{ base: 'flex', lg: 'none' }}
    />
  </Flex>
</Box>