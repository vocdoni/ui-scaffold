import { Heading, List, ListIcon, ListItem, Progress, Stack, Text } from '@chakra-ui/react'
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

  // step status changes
  useEffect(() => {
    if (!step || steps[step]) return

    setSteps((steps: CreationStepsState) => ({
      ...steps,
      [step]: true,
    }))
  }, [step])

  return (
    <Stack direction='column' gap={4}>
      <Text>{t('process_create.creation_steps_description')}</Text>
      <Heading as='h2' size='md' textAlign='center'>
        {t('process_create.creation_steps_title')}
      </Heading>
      <List spacing={3}>
        {Object.keys(labels).map((key) => (
          <ListItem key={key}>
            <ListIcon
              as={steps[key as keyof CreationStepsState] ? AiFillCheckCircle : AiFillCloseCircle}
              fontSize={22}
            />
            {labels[key]}
          </ListItem>
        ))}
      </List>
      {!error && <Progress isIndeterminate />}
      {error ? <Text color='red.300'>{error}</Text> : <Text>{t('process_create.do_not_close')}</Text>}
    </Stack>
  )
}
