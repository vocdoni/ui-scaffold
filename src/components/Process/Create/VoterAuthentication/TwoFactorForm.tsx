import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  FormControl,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  TabPanel,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { LuLock } from 'react-icons/lu'

export const TwoFactorForm = () => {
  const { t } = useTranslation()
  const { control, watch } = useFormContext()
  const use2FA = watch('use2FA')

  const TwoFactorMethods = [
    {
      value: 'email',
      label: t('process_create.voter_auth_2fa_email', { defaultValue: 'Email verification' }),
      description: t('process_create.voter_auth_2fa_email_description', {
        defaultValue: 'Voters will receive a verification code via email',
      }),
    },
    {
      value: 'sms',
      label: t('process_create.voter_auth_2fa_sms', { defaultValue: 'SMS verification' }),
      description: t('process_create.voter_auth_2fa_sms_description', {
        defaultValue: 'Voters will receive a verification code via SMS',
      }),
    },
    {
      value: 'voter_choice',
      label: t('process_create.voter_auth_2fa_voter_choice', { defaultValue: "Voter's choice" }),
      description: t('process_create.voter_auth_2fa_voter_choice_description', {
        defaultValue: 'Voters can choose their preferred verification method',
      }),
    },
  ]

  return (
    <TabPanel>
      <Box>
        <VStack spacing={4} border='1px solid' borderColor='table.border' p={4} borderRadius='md'>
          <FormControl as={HStack}>
            <Box>
              <FormLabel fontWeight='extrabold' m={0}>
                {t('process_create.voter_auth_2fa_enable', { defaultValue: 'Enable Two-Factor Authentication' })}
              </FormLabel>
              <Text fontSize='sm' color='texts.subtle'>
                {t('process_create.voter_auth_2fa_description', {
                  defaultValue: 'Add an extra layer of security by requiring voters to verify their identity',
                })}
              </Text>
            </Box>
            <Controller
              name='use2FA'
              control={control}
              render={({ field }) => (
                <Switch
                  isChecked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  colorScheme='black'
                />
              )}
            />
          </FormControl>

          {use2FA && (
            <VStack align='start' spacing={6}>
              <Box>
                <Text fontWeight='bold'>
                  {t('process_create.voter_auth_2fa_method_title', { defaultValue: 'Select verification method' })}
                </Text>
                <VStack align='start' spacing={3} mt={3}>
                  <FormControl>
                    <Controller
                      name='use2FAMethod'
                      control={control}
                      render={({ field }) => (
                        <RadioGroup {...field} colorScheme='black'>
                          <Stack direction='column' gap={2}>
                            {TwoFactorMethods.map((method) => (
                              <Radio key={method.value} value={method.value} alignItems='flex-start' size='sm'>
                                <Text fontWeight='bold'>{method.label}</Text>
                                <Text fontSize='sm' color='texts.subtle'>
                                  {method.description}
                                </Text>
                              </Radio>
                            ))}
                          </Stack>
                        </RadioGroup>
                      )}
                    />
                  </FormControl>
                </VStack>
              </Box>

              <Alert status='success' variant='subtle' borderRadius='md' alignItems='start' py={3} px={4}>
                <AlertIcon as={LuLock} />
                <Box>
                  <AlertTitle fontWeight='bold'>
                    {t('process_create.voter_auth_2fa_security_title', { defaultValue: 'Enhanced Security' })}
                  </AlertTitle>
                  <AlertDescription fontSize='sm'>
                    {t('process_create.voter_auth_2fa_security_description', {
                      defaultValue:
                        'Two-factor authentication significantly increases the security of your voting process by ensuring only authorized members can vote.',
                    })}
                  </AlertDescription>
                </Box>
              </Alert>
            </VStack>
          )}
        </VStack>
      </Box>
    </TabPanel>
  )
}
