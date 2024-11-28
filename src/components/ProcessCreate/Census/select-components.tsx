import { CheckIcon, ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import { Avatar, Flex, Link, Text } from '@chakra-ui/react'
import { getNetwork } from '@ethersproject/providers'
import {
  chakraComponents,
  DropdownIndicatorProps,
  GroupBase,
  GroupHeadingProps,
  OptionProps,
  SingleValueProps,
} from 'chakra-react-select'
import { useEffect, useState } from 'react'
import { BsImage } from 'react-icons/bs'
import { FaEthereum } from 'react-icons/fa'
import { FaPeopleGroup } from 'react-icons/fa6'
import ethIcon from '/assets/eth.jpg'
import polygonIcon from '/assets/polygon-matic.jpg'

const SingleValueToken = (props: SingleValueProps<any, false, GroupBase<any>>) => {
  const {
    data: { name, iconURI, ID, chainID },
    children,
  } = props
  return (
    <chakraComponents.SingleValue {...props}>
      <CryptoAvatar name={name} icon={iconURI} id={ID} chainId={chainID} />
      {children}
    </chakraComponents.SingleValue>
  )
}

const GroupHeadingToken = (props: GroupHeadingProps<any, false, GroupBase<any>>) => {
  const { data } = props

  if (!data || !data.label) return null

  const [opt] = data.options

  if (opt.type === 'request') return null

  return (
    <chakraComponents.GroupHeading {...props}>
      <Flex alignItems='center' gap={2}>
        {opt.type === 'poap' && <FaPeopleGroup />}
        {opt.type === 'erc721' && <BsImage />}
        {!(opt.type === 'ecr721') && !(opt.type === 'poap') && <FaEthereum />}

        {props.children}
      </Flex>
    </chakraComponents.GroupHeading>
  )
}

const OptionToken = (props: OptionProps<any, false, GroupBase<any>>) => {
  const {
    children,
    data: { type: groupType, name, iconURI, ID, chainID },
    isSelected,
  } = props
  if (groupType === 'request') {
    return (
      <chakraComponents.Option {...props}>
        <Flex justifyContent='center' w='full'>
          <Link href='https://tally.so/r/mO46VY' target='_blank' fontWeight='bold'>
            <Text as='span' fontSize='xl'>
              +
            </Text>{' '}
            {children}
          </Link>
        </Flex>
      </chakraComponents.Option>
    )
  } else {
    return (
      <chakraComponents.Option {...props}>
        <Flex justifyContent={'space-between'} alignItems={'center'} w='full'>
          <Flex gap={2} color='black'>
            <CryptoAvatar name={name} icon={iconURI} id={ID} chainId={chainID} />
            <Text>{children}</Text>
          </Flex>
          {isSelected && <CheckIcon color='input.dropdown.check_icon' ml='auto' />}
        </Flex>
      </chakraComponents.Option>
    )
  }
}

const DropdownIndicatorToken = (props: DropdownIndicatorProps<any, false, GroupBase<any>>) => (
  <>
    <chakraComponents.DropdownIndicator {...props}>
      <SearchIcon fontSize='sm' />
    </chakraComponents.DropdownIndicator>
    <chakraComponents.DropdownIndicator {...props}>
      <ChevronDownIcon />
    </chakraComponents.DropdownIndicator>
  </>
)

const getIconSource = (shortName: string) => {
  switch (shortName) {
    case 'eth':
    case 'gor':
      return ethIcon
    case 'matic':
    case 'maticmum':
      return polygonIcon
    default:
      return undefined
  }
}
const SingleValueNetwork = (props: SingleValueProps<any, false, GroupBase<any>>) => {
  const {
    data: { name, shortName },
    children,
  } = props

  const iconSource = getIconSource(shortName)
  return (
    <chakraComponents.SingleValue {...props}>
      <CryptoAvatar name={name} icon={iconSource} />
      {children}
    </chakraComponents.SingleValue>
  )
}
const OptionNetwork = (props: OptionProps<any, false, GroupBase<any>>) => {
  const {
    data: { name, shortName },
    children,
    isSelected,
  } = props

  const iconSource = getIconSource(shortName)
  return (
    <chakraComponents.Option {...props}>
      <Flex justifyContent={'space-between'} alignItems={'center'} w='full'>
        <Flex gap={2}>
          <CryptoAvatar name={name} icon={iconSource} />
          <Text>{children}</Text>
        </Flex>
        {isSelected && <CheckIcon color='input.dropdown.check_icon' ml='auto' />}
      </Flex>
    </chakraComponents.Option>
  )
}

export default {
  tokens: {
    SingleValue: SingleValueToken,
    GroupHeading: GroupHeadingToken,
    Option: OptionToken,
    DropdownIndicator: DropdownIndicatorToken,
  },
  networks: {
    SingleValue: SingleValueNetwork,
    Option: OptionNetwork,
  },
}

export const CryptoAvatar = ({
  name,
  icon,
  id,
  chainId,
  size,
}: {
  name?: string
  icon?: string
  id?: string
  chainId?: number
  size?: string
}) => {
  const [netName, setNetName] = useState('ethereum')

  useEffect(() => {
    ;(async () => {
      if (!chainId || chainId === 1) return
      const network = await getNetwork(chainId)
      setNetName(network.name)
    })()
  }, [chainId])

  return (
    <Avatar
      size={size || 'xs'}
      name={name}
      src={
        icon ||
        `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${netName}/assets/${id}/logo.png`
      }
      mr={2}
    />
  )
}
