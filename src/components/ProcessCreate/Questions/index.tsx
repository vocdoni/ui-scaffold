import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { Box, Flex, HStack, IconButton, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FieldError, FieldErrors, useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Question from './Question'
interface CustomFieldError extends FieldError {
  index: number
}

const CreateProcessQuestions = () => {
  const { t } = useTranslation()
  const {
    watch,
    formState: { errors },
  } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    name: 'questions',
  })

  const [tabIndex, setTabIndex] = useState(0)

  const questions = watch('questions')

  const getQuestionErrorIndex = (index: number): number | null => {
    const questionErrors = errors.questions as FieldErrors<CustomFieldError>[] | undefined
    if (questionErrors && questionErrors[index]) {
      return index
    }
    return null
  }

  useEffect(() => {
    if (questions.length === 0) {
      append({
        title: '',
        description: '',
        options: [{ option: '' }, { option: '' }],
      })
    } else {
      setTabIndex(questions.length - 1)
    }
  }, [questions, append])

  return (
    <Tabs
      display='flex'
      alignItems='start'
      borderRadius='lg'
      border='1px solid'
      borderColor='process_create.border'
      minH='70vh'
      index={tabIndex}
      onChange={(index) => setTabIndex(index)}
    >
      <Box width='full' maxW='30%'>
        <HStack justifyContent='space-between' p={3} borderBottom='1px solid' borderColor='process_create.border'>
          <Text as='legend' fontSize='xl'>
            {t('form.process_create.questions_title')}
          </Text>
          <IconButton
            type='button'
            size='sm'
            icon={<AddIcon />}
            aria-label='add question'
            onClick={() => {
              append({
                title: '',
                description: '',
                options: [{ option: '' }, { option: '' }],
              })
            }}
          />
        </HStack>
        <TabList display='flex' flexDirection='column' gap={1} border='none' p={1}>
          {questions.map((question: any, index: number) => (
            <Flex
              key={index}
              justifyContent='space-between'
              bgColor='process_create.aside_questions_bg'
              p={2}
              borderRadius={4}
            >
              <Tab
                p={0}
                border='none'
                w={56}
                _selected={{ color: getQuestionErrorIndex(index) !== null ? 'red' : 'black', fontWeight: 700 }}
                color={getQuestionErrorIndex(index) !== null ? 'red' : 'black'}
              >
                <Text
                  pl={0}
                  isTruncated
                  textAlign='start'
                  w='full'
                  title={(question as any).title || t('form.process_create.question.aside')}
                >
                  {index + 1}- {(question as any).title || t('form.process_create.question.aside')}
                </Text>
              </Tab>
              <IconButton type='button' size='sm' icon={<DeleteIcon />} aria-label='' onClick={() => remove(index)} />
            </Flex>
          ))}
        </TabList>
      </Box>
      <TabPanels
        bgColor='process_create.bg'
        py={10}
        px={18}
        borderLeft='1px solid'
        borderColor='process_create.border'
        minH='70vh'
      >
        {fields.map((question, index) => (
          <TabPanel key={question.id} display='flex' flexDirection='column' gap={5}>
            <Question index={index} remove={() => remove(index)} />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}

export default CreateProcessQuestions
