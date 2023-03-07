import { AddIcon } from '@chakra-ui/icons'
import { Flex, HStack, IconButton, Text } from '@chakra-ui/react'
import { useFieldArray } from 'react-hook-form'
import CreateProcessQuestion from './CreateProcessQuestion'

const CreateProcessQuestions = () => {
  const { fields, append, remove } = useFieldArray({
    name: 'questions',
  })

  return (
    <Flex
      as='fieldset'
      direction='column'
      gap={4}
      p={4}
      bg='gray.100'
      borderRadius={8}
      _dark={{ bg: 'black.c90' }}
    >
      <HStack
        justifyContent='space-between'
        bg='white'
        p={4}
        borderRadius={8}
        _dark={{ bg: 'black.c60' }}
      >
        <Text as='legend' fontSize='1.3em'>
          Questions
        </Text>
        <IconButton
          type='button'
          icon={<AddIcon />}
          aria-label='add question'
          onClick={() =>
            append({
              titleQuestion: '',
              descriptionQuestion: '',
              options: [{ option: '' }, { option: '' }],
            })
          }
        />
      </HStack>
      {fields.map((question, index) => (
        <CreateProcessQuestion
          key={question.id}
          index={index}
          remove={() => remove(index)}
        />
      ))}
    </Flex>
  )
}

export default CreateProcessQuestions
