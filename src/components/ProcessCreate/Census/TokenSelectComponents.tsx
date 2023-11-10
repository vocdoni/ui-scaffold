import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import { Avatar, Flex, Link, Text } from '@chakra-ui/react'
import { chakraComponents } from 'chakra-react-select'
import { BsImage } from 'react-icons/bs'
import { FaEthereum } from 'react-icons/fa'
import { FaPeopleGroup } from 'react-icons/fa6'
import ethIcon from '/assets/eth.jpg'
import polygonIcon from '/assets/polygon-matic.jpg'

export const customComponentsTokens = {
  SingleValue: (props: any) => {
    return (
      <chakraComponents.SingleValue {...props}>
        <Avatar
          size='xs'
          name={props.data.name}
          src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${props.data.ID}/logo.png`}
          mr={2}
        />
        {props.children}
      </chakraComponents.SingleValue>
    )
  },
  GroupHeading: (props: any) => {
    const poap = /poap/i
    const nft = /nft/i

    if (props.data.label === 'request') return

    return (
      <chakraComponents.GroupHeading {...props}>
        <Flex alignItems='center' gap={2}>
          {poap.test(props.data.label) && <FaPeopleGroup />}
          {nft.test(props.data.label) && <BsImage />}
          {!poap.test(props.data.label) && !nft.test(props.data.label) && <FaEthereum />}

          {props.children}
        </Flex>
      </chakraComponents.GroupHeading>
    )
  },
  Option: (props: any) => {
    if (props.data.ID === 'request') {
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
              src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${props.data.ID}/logo.png`}
            />
            <Text>{props.children}</Text>
          </Flex>
        </chakraComponents.Option>
      )
    }
  },

  DropdownIndicator: (props: any) => (
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
export const customComponentsNetwork = {
  SingleValue: (props: any) => {
    const iconSource = getIconSource(props.data.shortName)
    return (
      <chakraComponents.SingleValue {...props}>
        <Avatar size='xs' name={props.data.name} src={iconSource} mr={2} />
        {props.children}
      </chakraComponents.SingleValue>
    )
  },
  Option: (props: any) => {
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
