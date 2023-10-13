import { List, ListIcon, ListItem, Spinner, Stack, Text } from '@chakra-ui/react'
import { ElectionCreationSteps } from '@vocdoni/sdk'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'

export type Steps =
  | ElectionCreationSteps.CENSUS_CREATED
  | ElectionCreationSteps.SIGN_TX
  | ElectionCreationSteps.DONE
  | undefined

type CreationProgressProps = {
  error: string | null
  sending: boolean
  step: Steps
}

const EmptyCreationStepsState = {
  [ElectionCreationSteps.CENSUS_CREATED]: false,
  [ElectionCreationSteps.SIGN_TX]: false,
  [ElectionCreationSteps.DONE]: false,
}
type CreationStepsState = typeof EmptyCreationStepsState

export const CreationProgress = ({ error, sending, step }: CreationProgressProps) => {
  const [steps, setSteps] = useState<CreationStepsState>(EmptyCreationStepsState)
  const { t } = useTranslation()
  const labels: { [key: string]: string } = {
    [ElectionCreationSteps.CENSUS_CREATED]: t('process_create.creation_steps.census_created'),
    [ElectionCreationSteps.SIGN_TX]: t('process_create.creation_steps.sign_tx'),
    [ElectionCreationSteps.DONE]: t('process_create.creation_steps.done'),
  }

  // clear steps on render
  useEffect(() => {
    setSteps(EmptyCreationStepsState)
  }, [])

  // step status changes
  useEffect(() => {
    if (!step || steps[step]) return

    setSteps((steps: CreationStepsState) => ({
      ...steps,
      [step]: true,
    }))
  }, [step])

  return (
    <Stack>
      <Text mb={6} textAlign='center' color='modal_description'>
        {t('process_create.creation_steps_description')}
      </Text>
      <List spacing={3}>
        {Object.keys(labels).map((key, index) => (
          <ListItem key={key} display='flex' alignItems='center' gap={2}>
            {steps[key as keyof CreationStepsState] ? (
              <ListIcon as={AiFillCheckCircle} fontSize={23} m={0} />
            ) : (
              <>{!error ? <Spinner boxSize={5} mr='3px' /> : <ListIcon as={AiFillCloseCircle} fontSize={23} m={0} />}</>
            )}
            <Text>{labels[key]}</Text>
          </ListItem>
        ))}
      </List>
      {error && (
        <Text color='red.300' textAlign='center' mt={5}>
          {error}
        </Text>
      )}
    </Stack>
  )
}
