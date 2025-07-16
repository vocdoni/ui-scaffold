import { Box, Button, Flex, Icon, useDisclosure, VStack } from '@chakra-ui/react'
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
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
  const { control, watch, setValue, getValues } = useFormContext()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'questions',
  })
  const questionType = watch('questionType')

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const addQuestion = () => append(DefaultQuestions[questionType])

  const removeQuestion = (index) => {
    remove(index)
    onClose()
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id)
      const newIndex = fields.findIndex((field) => field.id === over.id)

      if (oldIndex !== -1 && newIndex !== -1) {
        // Get current form values
        const currentQuestions = getValues('questions')

        // Reorder the array
        const reorderedQuestions = arrayMove(currentQuestions, oldIndex, newIndex)

        // Update the form with reordered questions
        setValue('questions', reorderedQuestions)

        // Move the field array items
        move(oldIndex, newIndex)
      }
    }
  }

  return (
    <VStack align='stretch' spacing={4}>
      <DashboardSection>
        <QuestionType />
      </DashboardSection>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext items={fields.map((field) => field.id)} strategy={verticalListSortingStrategy}>
          {fields.map((field, index) => (
            <Box key={field.id}>
              <QuestionForm index={index} onRemove={onOpen} questionId={field.id} />
              <DeleteQuestionModal isOpen={isOpen} onClose={onClose} removeQuestion={() => removeQuestion(index)} />
            </Box>
          ))}
        </SortableContext>
      </DndContext>

      {questionType === QuestionTypes.Single && (
        <Button leftIcon={<Icon as={LuPlus} />} variant='outline' onClick={addQuestion}>
          <Trans i18nKey='process.create.question.add'>Add question</Trans>
        </Button>
      )}
    </VStack>
  )
}
