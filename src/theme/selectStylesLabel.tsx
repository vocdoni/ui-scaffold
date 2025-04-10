import { CheckIcon } from '@chakra-ui/icons'
import { Box, Flex, Icon, Text } from '@chakra-ui/react'

export const formatLanguageOptionLabel =
  (i18n: any) =>
  (option: any, { context }: { context: 'menu' | 'value' }) => {
    const isSelected = option.value === i18n.language

    return (
      <Flex alignItems='center' gap={2} w='100%' px={1}>
        {context === 'menu' &&
          (isSelected ? <Icon as={CheckIcon} boxSize='3' color='black' /> : <Box boxSize='3' visibility='hidden' />)}
        <Text color='black'>{option.label}</Text>
      </Flex>
    )
  }
