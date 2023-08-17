import { Avatar, Flex, FlexProps, Text, TextProps } from '@chakra-ui/react'
import { addressTextOverflow } from '@constants'
import { enforceHexPrefix, useOrganization } from '@vocdoni/react-providers'
import { Trans } from 'react-i18next'

export const CreatedBy = (props: FlexProps) => {
  const { organization } = useOrganization()

  return (
    <Flex gap={2} alignItems='center' {...props}>
      <Avatar
        alignSelf='start'
        size='sm'
        src={organization?.account.avatar}
        name={organization?.account.name.default}
      />
      <LongOrganizationName />
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
      <Trans
        i18nKey='organization.name_long'
        values={{ name, address }}
        components={{
          strong: <strong />,
        }}
      >
        <strong>{name}</strong> ({address})
      </Trans>
    </Text>
  )
}
