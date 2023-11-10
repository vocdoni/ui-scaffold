import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import { Avatar, Flex, Link, Text } from '@chakra-ui/react'
import { chakraComponents } from 'chakra-react-select'
import { BsImage } from 'react-icons/bs'
import { FaEthereum } from 'react-icons/fa'
import { FaPeopleGroup } from 'react-icons/fa6'

export const customComponentsTokens = {
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

export const customComponentsNetwork = {
  Option: (props: any) => (
    <chakraComponents.Option {...props}>
      <Flex alignItems='center' gap={2}>
        <FaEthereum />
        <Text>{props.children}</Text>
      </Flex>
    </chakraComponents.Option>
  ),
}
