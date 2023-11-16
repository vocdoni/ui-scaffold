import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import { Flex, Link, Text } from '@chakra-ui/react'
import {
  chakraComponents,
  DropdownIndicatorProps,
  GroupBase,
  GroupHeadingProps,
  OptionProps,
  SingleValueProps,
} from 'chakra-react-select'
import { BsImage } from 'react-icons/bs'
import { FaEthereum } from 'react-icons/fa'
import { FaPeopleGroup } from 'react-icons/fa6'
import { CustomAvatar } from './Token'
import ethIcon from '/assets/eth.jpg'
import polygonIcon from '/assets/polygon-matic.jpg'

const SingleValueToken = (props: SingleValueProps<any, false, GroupBase<any>>) => {
  const {
    data: { name, iconURI, ID },
    children,
  } = props
  return (
    <chakraComponents.SingleValue {...props}>
      <CustomAvatar name={name} icon={iconURI} id={ID} />
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
    data: { type: groupType, name, iconURI, ID },
  } = props

  if (groupType === 'request') {
    return (
      <chakraComponents.Option {...props}>
        <Flex justifyContent='center' w='full'>
          <Link variant='primary' href='https://tally.so/r/mO46VY' target='_blank' fontWeight='bold'>
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
        <Flex alignItems='center' gap={2}>
          <CustomAvatar name={name} icon={iconURI} id={ID} />

          <Text>{children}</Text>
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
      <CustomAvatar name={name} icon={iconSource} />
      {children}
    </chakraComponents.SingleValue>
  )
}
const OptionNetwork = (props: OptionProps<any, false, GroupBase<any>>) => {
  const {
    data: { name, shortName },
    children,
  } = props

  const iconSource = getIconSource(shortName)
  return (
    <chakraComponents.Option {...props}>
      <Flex alignItems='center' gap={2}>
        <CustomAvatar name={name} icon={iconSource} />
        <Text>{children}</Text>
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
