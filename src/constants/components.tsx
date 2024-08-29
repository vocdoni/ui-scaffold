import { Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

export const convertParagraphs = (input: string): ReactNode[] => {
  const parts = input.split(/<\/?p>/).filter(Boolean)

  return parts.map((part, index) => <Text key={index}>{part}</Text>)
}
