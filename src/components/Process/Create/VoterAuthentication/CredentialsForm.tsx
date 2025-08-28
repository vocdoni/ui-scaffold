import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  TabPanel,
  Text,
} from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { LuCheck, LuInfo } from 'react-icons/lu'
import { useMemberColumns } from '~elements/dashboard/memberbase/members'

export const CredentialsForm = () => {
  const { t } = useTranslation()
  const fields = useMemberColumns()
  const { control, watch } = useFormContext()
  const credentials = watch('credentials')

  return (
    <TabPanel px={0} pb={0}>
      <Box>
        <Flex direction='column' border='1px solid' borderColor='table.border' p={4} borderRadius='md' gap={4}>
          <Text fontSize='sm' fontWeight='extrabold'>
            {t('process_create.voter_auth_select_credentials', {
              defaultValue: 'Select required credentials for voter authentication',
            })}
          </Text>
          <Text fontSize='sm' color='texts.subtle'>
            {t('process_create.voter_auth_select_credentials_description', {
              defaultValue:
                'Choose the fields voters must provide to authenticate. Select up to 3 for the best balance of security and ease of use. If you plan to use only email or phone for 2FA, skip this step and click Next to set it up',
            })}
          </Text>
          <Flex direction='column' gap={2}>
            <Controller
              name='credentials'
              control={control}
              rules={{ validate: (val) => val.length <= 3 }}
              render={({ field }) => (
                <CheckboxGroup value={field.value} onChange={(value: string[]) => field.onChange(value)}>
                  {fields.map((column) => {
                    if (column.is2fa) return null // Skip 2FA fields in this selection
                    const isChecked = credentials.includes(column.id)
                    const isAtLimit = credentials.length >= 3 && !isChecked
                    return (
                      <Checkbox key={column.id} value={column.id} isDisabled={isAtLimit}>
                        {column.label}
                      </Checkbox>
                    )
                  })}
                </CheckboxGroup>
              )}
            />
          </Flex>
          {credentials.length >= 1 && (
            <Alert
              status={credentials.length >= 2 ? 'success' : 'info'}
              variant='subtle'
              borderRadius='md'
              alignItems='start'
              py={3}
              px={4}
            >
              <AlertIcon as={credentials.length >= 2 ? LuCheck : LuInfo} />
              <Box>
                <AlertTitle fontWeight='bold'>
                  {credentials.length >= 2
                    ? t('process_create.voter_auth_security_level', { defaultValue: 'Good security' })
                    : t('process_create.voter_auth_security_recommendation_title', {
                        defaultValue: 'Security recommendation',
                      })}
                </AlertTitle>
                <AlertDescription fontSize='sm'>
                  {credentials.length === 1 &&
                    t('process_create.voter_auth_security_recommendation_1', {
                      defaultValue: 'For better security, we recommend selecting at least 2 credentials.',
                    })}
                  {credentials.length >= 2 &&
                    t('process_create.voter_auth_security_recommendation_2', {
                      defaultValue:
                        "You've selected {{ count }} credentials, which provides good security for your voters.",
                      count: credentials.length,
                    })}
                </AlertDescription>
              </Box>
            </Alert>
          )}
          <Text>
            {t('process_create.voter_auth_selected_credentials_count', {
              defaultValue: '{{ count }}/3 credentials selected',
              count: credentials.length,
            })}
          </Text>
        </Flex>
      </Box>
    </TabPanel>
  )
}
