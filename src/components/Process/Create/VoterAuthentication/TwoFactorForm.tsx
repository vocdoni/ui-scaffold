import { Box, FormControl, HStack, Icon, Switch, TabPanel, Text, Tooltip, VStack } from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { LuInfo, LuMail, LuPhone } from 'react-icons/lu'
import { TwoFAMethod } from './utils'

type MethodConfig = {
  value: TwoFAMethod
  icon: typeof LuMail
  iconColor: string
  label: string
  description: string
  tooltip?: string
}

export const TwoFactorForm = () => {
  const { t } = useTranslation()
  const { control, watch } = useFormContext()
  const use2FA = watch('use2FA')

  const TwoFactorMethods: MethodConfig[] = [
    {
      value: 'email',
      icon: LuMail,
      iconColor: 'blue.500',
      label: t('voter_auth.2fa_email', { defaultValue: 'Email verification' }),
      description: t('voter_auth.2fa_email_description', {
        defaultValue: 'Voters will receive a verification code via email',
      }),
    },
    {
      value: 'sms',
      icon: LuPhone,
      iconColor: 'green.500',
      label: t('voter_auth.2fa_sms', { defaultValue: 'SMS verification' }),
      description: t('voter_auth.2fa_sms_description', {
        defaultValue: 'Voters will receive a verification code via SMS',
      }),
    },
    {
      value: 'voter_choice',
      icon: LuMail,
      iconColor: 'purple.500',
      label: t('voter_auth.2fa_voter_choice', { defaultValue: "Voter's choice" }),
      description: t('voter_auth.2fa_voter_choice_description', {
        defaultValue: 'Voters can choose between email or SMS verification',
      }),
      tooltip: t('voter_auth.2fa_voter_choice_requirement_tooltip', {
        defaultValue: 'Both email and phone must be present in your memberbase for this option to work',
      }),
    },
  ]

  return (
    <TabPanel>
      <Box>
        <VStack spacing={4} border='1px solid' borderColor='table.border' p={4} borderRadius='md' align='start'>
          <FormControl as={HStack} w='full'>
            <VStack align='start' spacing={0} flex={1}>
              <HStack spacing={2}>
                <Text fontSize='sm' fontWeight='extrabold'>
                  {t('voter_auth.2fa_enable', { defaultValue: 'Enable Two-Factor Authentication' })}
                </Text>
                <Tooltip
                  label={t('voter_auth.2fa_info_tooltip', {
                    defaultValue:
                      'Two-Factor Authentication (2FA) sends a verification code to voters via email or SMS, providing an extra security layer beyond identity fields.',
                  })}
                  fontSize='sm'
                  placement='top'
                >
                  <Box as='span' cursor='help' color='texts.subtle'>
                    <LuInfo size={16} />
                  </Box>
                </Tooltip>
              </HStack>
              <Text fontSize='sm' color='texts.subtle'>
                {t('voter_auth.2fa_description', {
                  defaultValue: 'Add an extra layer of security by requiring voters to verify their identity',
                })}
              </Text>
            </VStack>
            <Controller
              name='use2FA'
              control={control}
              render={({ field }) => (
                <Switch isChecked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
              )}
            />
          </FormControl>

          {use2FA && (
            <VStack align='start' spacing={4} w='full'>
              <Text fontSize='sm' fontWeight='extrabold'>
                {t('voter_auth.2fa_method_title', { defaultValue: 'Select verification method' })}
              </Text>
              <FormControl>
                <Controller
                  name='use2FAMethod'
                  control={control}
                  render={({ field }) => (
                    <VStack spacing={3} w='full'>
                      {TwoFactorMethods.map((method) => {
                        const isSelected = field.value === method.value
                        return (
                          <Box
                            key={method.value}
                            w='full'
                            minH='100px'
                            p={4}
                            border='2px solid'
                            borderColor={isSelected ? 'black' : 'gray.200'}
                            borderRadius='md'
                            bg={isSelected ? 'gray.50' : 'white'}
                            cursor='pointer'
                            onClick={() => field.onChange(method.value)}
                            _hover={{
                              borderColor: isSelected ? 'black' : 'gray.300',
                              boxShadow: 'sm',
                            }}
                            transition='all 0.2s'
                            role='radio'
                            aria-checked={isSelected}
                            aria-labelledby={`method-${method.value}-label`}
                            aria-describedby={`method-${method.value}-desc`}
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                                field.onChange(method.value)
                              }
                            }}
                          >
                            <HStack align='start' spacing={3}>
                              <Icon as={method.icon} boxSize={5} color={method.iconColor} mt={0.5} />
                              <VStack align='start' spacing={1} flex={1}>
                                <HStack spacing={2}>
                                  <Text id={`method-${method.value}-label`} fontSize='sm' fontWeight='semibold'>
                                    {method.label}
                                  </Text>
                                  {method.tooltip && (
                                    <Tooltip label={method.tooltip} fontSize='sm' placement='top'>
                                      <Box as='span' cursor='help' color='texts.subtle'>
                                        <LuInfo size={16} />
                                      </Box>
                                    </Tooltip>
                                  )}
                                </HStack>
                                <Text id={`method-${method.value}-desc`} fontSize='sm' color='texts.subtle'>
                                  {method.description}
                                </Text>
                              </VStack>
                            </HStack>
                          </Box>
                        )
                      })}
                    </VStack>
                  )}
                />
              </FormControl>
            </VStack>
          )}
        </VStack>
      </Box>
    </TabPanel>
  )
}
