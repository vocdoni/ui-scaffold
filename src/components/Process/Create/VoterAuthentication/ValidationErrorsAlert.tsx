import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

export type ValidationErrorData = {
  memberIds: string[]
  duplicates: string[]
  missingData: string[]
}

export type ValidationError = {
  error: string
  code: number
  data: ValidationErrorData
}

export const ValidationErrorsAlert = ({ validationError }: { validationError: ValidationError | null }) => {
  const { t } = useTranslation()

  if (!validationError) return null

  const errorData: ValidationErrorData = validationError?.data

  if (!errorData) return <Alert status='error'>{validationError.error || 'Internal server error'}</Alert>

  const { memberIds, duplicates, missingData } = errorData
  const hasDuplicates = duplicates.length > 0
  const hasMissing = missingData.length > 0
  const total = memberIds.length

  if (!hasDuplicates && !hasMissing) return null

  return (
    <Alert status='error' variant='subtle' borderRadius='md'>
      <AlertIcon />
      <Box>
        <AlertTitle fontWeight='bold'>{t('voter_auth.validation_error_title', 'Validation Error')}</AlertTitle>

        <AlertDescription fontSize='sm'>
          <Stack spacing={3} mt={2}>
            <Text>
              {t('voter_auth.validation_summary', {
                defaultValue: 'Validation failed for some users.',
              })}
            </Text>

            <UnorderedList>
              <ListItem>
                {t('voter_auth.validation_total', {
                  defaultValue: '{{count}} users total',
                  count: total,
                })}
              </ListItem>
              <ListItem>
                {t('voter_auth.validation_missing_data', {
                  defaultValue: '{{count}} users missing required fields',
                  count: missingData.length,
                })}
              </ListItem>
              <ListItem>
                {t('voter_auth.validation_duplicates', {
                  defaultValue: '{{count}} duplicated users',
                  count: duplicates.length,
                })}
              </ListItem>
            </UnorderedList>
          </Stack>
        </AlertDescription>
      </Box>
    </Alert>
  )
}
