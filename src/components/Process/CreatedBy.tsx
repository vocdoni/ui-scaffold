import { CopyIcon } from '@chakra-ui/icons'
import { Avatar, Flex, FlexProps, IconButton, Text, TextProps, useClipboard, useToast } from '@chakra-ui/react'
import { enforceHexPrefix, useOrganization } from '@vocdoni/react-providers'
import { useTranslation } from 'react-i18next'
import { addressTextOverflow } from '~constants'

export const CreatedBy = (props: FlexProps) => {
  const { organization } = useOrganization()

  return (
    <Flex gap={2} alignItems='center' {...props}>
      <Avatar size='sm' src={organization?.account.avatar} name={organization?.account.name.default} />
      <LongOrganizationName />
      <CopyAddressBtn />
    </Flex>
  )
}

export const LongOrganizationName = (props: TextProps) => {
  const { organization } = useOrganization()

  if (!organization) return null

  const { account } = organization
  const address = addressTextOverflow(enforceHexPrefix(organization.address))

  if (!account.name) {
    return <Text {...props}>{address}</Text>
  }
  const name = account.name.default

  return (
    <Text {...props}>
      <strong>{name}</strong>
    </Text>
  )
}

const CopyAddressBtn = () => {
  const { organization } = useOrganization()
  const { onCopy } = useClipboard(organization?.address as string)

  const toast = useToast()
  const { t } = useTranslation()
  if (!organization) return null

  return (
    <IconButton
      variant='transparent'
      icon={<CopyIcon boxSize={3} />}
      aria-label='copy address'
      onClick={() => {
        toast({
          title: t('copy.copied_title'),
          duration: 3000,
        })
        onCopy()
      }}
    />
  )
}
