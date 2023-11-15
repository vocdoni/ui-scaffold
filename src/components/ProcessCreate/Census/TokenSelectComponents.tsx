import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import { Avatar, Flex, Link, Text } from '@chakra-ui/react'
import {
  chakraComponents,
  DropdownIndicatorProps,
  GroupBase,
  GroupHeadingProps,
  OptionProps,
  SelectComponentsConfig,
  SingleValueProps,
} from 'chakra-react-select'
import { BsImage } from 'react-icons/bs'
import { FaEthereum } from 'react-icons/fa'
import { FaPeopleGroup } from 'react-icons/fa6'
import ethIcon from '/assets/eth.jpg'
import polygonIcon from '/assets/polygon-matic.jpg'

export const customComponentsTokens: Partial<SelectComponentsConfig<any, false, GroupBase<any>>> = {
  SingleValue: (props: SingleValueProps<any, false, GroupBase<any>>) => {
    return (
      <chakraComponents.SingleValue {...props}>
        <Avatar
          size='xs'
          name={props.data.name}
          src={
            props.data.iconURI ||
            `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${props.data.ID}/logo.png`
          }
          mr={2}
        />
        {props.children}
      </chakraComponents.SingleValue>
    )
  },
  GroupHeading: (props: GroupHeadingProps<any, false, GroupBase<any>>) => {
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
  },

  Option: (props: OptionProps<any, false, GroupBase<any>>) => {
    const {
      data: { type: groupType },
    } = props

    if (groupType === 'request') {
      return (
        <chakraComponents.Option {...props}>
          <Flex justifyContent='center' w='full'>
            <Link variant='primary' href='https://tally.so/r/mO46VY' target='_blank' fontWeight='bold'>
              <Text as='span' fontSize='xl'>
                +
              </Text>{' '}
              {props.children}
            </Link>
          </Flex>
        </chakraComponents.Option>
      )
    } else {
      return (
        <chakraComponents.Option {...props}>
          <Flex alignItems='center' gap={2}>
            <Avatar
              size='xs'
              name={props.data.name}
              src={
                props.data.iconURI ||
                `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${props.data.ID}/logo.png`
              }
            />
            <Text>{props.children}</Text>
          </Flex>
        </chakraComponents.Option>
      )
    }
  },

  DropdownIndicator: (props: DropdownIndicatorProps<any, false, GroupBase<any>>) => (
    <>
      <chakraComponents.DropdownIndicator {...props}>
        <SearchIcon fontSize='sm' />
      </chakraComponents.DropdownIndicator>
      <chakraComponents.DropdownIndicator {...props}>
        <ChevronDownIcon />
      </chakraComponents.DropdownIndicator>
    </>
  ),
}

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
export const customComponentsNetwork: Partial<SelectComponentsConfig<any, false, GroupBase<any>>> = {
  SingleValue: (props: SingleValueProps<any, false, GroupBase<any>>) => {
    const iconSource = getIconSource(props.data.shortName)
    return (
      <chakraComponents.SingleValue {...props}>
        <Avatar size='xs' name={props.data.name} src={iconSource} mr={2} />
        {props.children}
      </chakraComponents.SingleValue>
    )
  },
  Option: (props: OptionProps<any, false, GroupBase<any>>) => {
    const iconSource = getIconSource(props.data.shortName)
    return (
      <chakraComponents.Option {...props}>
        <Flex alignItems='center' gap={2}>
          <Avatar size='xs' name={props.data.name} src={iconSource} />
          <Text>{props.children}</Text>
        </Flex>
      </chakraComponents.Option>
    )
  },
}
