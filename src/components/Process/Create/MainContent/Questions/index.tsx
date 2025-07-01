import { Box, Button, Flex, Icon, useDisclosure, VStack } from '@chakra-ui/react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { LuPlus } from 'react-icons/lu'
import { DashboardSection } from '~components/shared/Dashboard/Contents'
import DeleteModal from '~components/shared/Modal/DeleteModal'
import { DefaultQuestions, QuestionTypes } from '../..'
import { QuestionForm } from './QuestionForm'
import { QuestionType } from './QuestionType'

const DeleteQuestionModal = ({ isOpen, onClose, removeQuestion }) => {
  const { t } = useTranslation()

  return (
    <DeleteModal
      title={t('process.create.question.delete.title', { defaultValue: 'Delete Question' })}
      subtitle={t('process.create.question.delete.description', {
        defaultValue: 'Are you sure you want to delete this question?',
      })}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Flex justifyContent='flex-end' mt={4} gap={2}>
        <Button variant='outline' onClick={onClose}>
          {t('process.create.question.delete.cancel_button', { defaultValue: 'Cancel' })}
        </Button>
        <Button colorScheme='red' onClick={removeQuestion}>
          {t('process.create.question.delete.delete_button', { defaultValue: 'Delete' })}
        </Button>
      </Flex>
    </DeleteModal>
  )
}

export const Questions = () => {
  const { control, watch } = useFormContext()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  })
  const questionType = watch('questionType')

  const addQuestion = () => append(DefaultQuestions[questionType])

  const removeQuestion = (index) => {
    remove(index)
    onClose()
  }

  return (
    <VStack align='stretch' spacing={4}>
      <DashboardSection>
        <QuestionType />
      </DashboardSection>

      {fields.map((field, index) => (
        <Box key={field.id}>
          <QuestionForm index={index} onRemove={onOpen} />
          <DeleteQuestionModal isOpen={isOpen} onClose={onClose} removeQuestion={() => removeQuestion(index)} />
        </Box>
      ))}

      {questionType === QuestionTypes.Single && (
        <Button leftIcon={<Icon as={LuPlus} />} variant='outline' onClick={addQuestion}>
          <Trans i18nKey='process.create.question.add'>Add question</Trans>
        </Button>
      )}
    </VStack>
  )
}
