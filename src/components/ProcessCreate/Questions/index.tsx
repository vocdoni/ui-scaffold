import { AddIcon } from '@chakra-ui/icons'
import { Flex, HStack, IconButton, Text } from '@chakra-ui/react'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import QuestionsForm from './Form'

const CreateProcessQuestions = () => {
  const { fields, append, remove } = useFieldArray({
    name: 'questions',
  })
  const { t } = useTranslation()

  return (
    <Flex
      as='fieldset'
      direction='column'
      gap={{ base: 1, sm: 4 }}
      p={{ base: 1, sm: 4 }}
      bg='gray.100'
      borderRadius='md'
      _dark={{ bg: 'black.c90' }}
    >
      <HStack
        justifyContent='space-between'
        bg='white'
        p={{ base: 2, sm: 4 }}
        borderRadius='md'
        _dark={{ bg: 'black.c60' }}
      >
        <Text as='legend' fontSize='1.3em'>
          {t('form.process_create.questions_title')}
        </Text>
        <IconButton
          type='button'
          size='sm'
          icon={<AddIcon />}
          aria-label='add question'
          onClick={() =>
            append({
              title: '',
              description: '',
              options: [{ option: '' }, { option: '' }],
            })
          }
        />
      </HStack>
      {fields.map((question, index) => (
        <QuestionsForm key={question.id} index={index} remove={() => remove(index)} />
      ))}
    </Flex>
  )
}

export default CreateProcessQuestions
