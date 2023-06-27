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
    }
    if (tabIndex === questions.length) setTabIndex(questions.length - 1)
  }, [questions, append, tabIndex])

  useEffect(() => {
    const questionErrors = errors.questions as FieldErrors<CustomFieldError>[] | undefined

    if (!questionErrors) return

    const firstError = questionErrors.findIndex((curr) => typeof curr !== 'undefined')
    setTabIndex(firstError)
  }, [errors.questions])

  return (
    <Tabs
      display='flex'
      flexDirection={{ base: 'column', md: 'row' }}
      alignItems='start'
      borderRadius='lg'
      border='1px solid'
      borderColor='process_create.border'
      minH={{ md: '70vh' }}
      index={tabIndex}
      onChange={(index) => setTabIndex(index)}
    >
      <Box width='full' maxW={{ md: '30%' }} mb={5}>
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
              setTabIndex(questions.length)
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
                w={{ base: '75vw', md: 56 }}
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
        px={{ md: 18 }}
        pt={{ md: 10 }}
        pb={10}
        borderLeft={{ md: '1px solid' }}
        borderTop={{ base: '1px solid', md: 'none' }}
        borderColor={{ base: 'process_create.border', md: 'process_create.border' }}
        minH={{ md: '70vh' }}
      >
        {fields.map((question, index) => (
          <TabPanel key={question.id} display='flex' flexDirection='column' gap={5}>
            <Question index={index} />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}

export default CreateProcessQuestions
