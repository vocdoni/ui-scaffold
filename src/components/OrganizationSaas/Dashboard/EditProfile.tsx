import {
  AspectRatio,
  Box,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Image,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { Button } from '@vocdoni/chakra-components'
import { errorToString, useClient, useOrganization } from '@vocdoni/react-providers'
import { Account } from '@vocdoni/sdk'
import { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { BiTrash } from 'react-icons/bi'
import { BsFillTrashFill } from 'react-icons/bs'
import { MdBrowserUpdated } from 'react-icons/md'
import InputCustom from '~components/Layout/InputCustom'
import {
  CountriesTypesSelector,
  CustomizationLanguageSelector,
  CustomizationTimeZoneSelector,
  MembershipSizeTypesSelector,
  OrganzationTypesSelector,
} from '~components/Layout/SaasSelector'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'
import fallback from '/assets/default-avatar.png'

interface EditFormFields {
  name: string
  description: string
  avatar: string
}

const REGEX_AVATAR = /^(https?:\/\/|ipfs:\/\/)/i

const EditProfile = () => {
  const { textColor, textColorSecondary, bgSecondary } = useDarkMode()
  const { account, fetchAccount } = useClient()
  const { update } = useOrganization()
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }

  const methods = useForm({
    defaultValues: {
      name: account?.account.name.default || '',
      description: account?.account.description.default || '',
      avatar: account?.account.avatar || '',
    },
  })

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  const avatar = watch('avatar')

  const correctAvatarFormat = (val: string) => REGEX_AVATAR.test(val)

  const onSubmit: SubmitHandler<EditFormFields> = async (values: EditFormFields) => {
    setLoading(true)

    try {
      await update(new Account({ ...account?.account, ...values }))
      fetchAccount()
    } catch (err: any) {
      setError(errorToString(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <FormProvider {...methods}>
      <Box height='100%' maxH='100%' overflowY='auto'>
        <Flex as='form' flexDirection='column' gap={12} maxW='600px' mx='auto'>
          <Flex flexDirection='column' gap={6}>
            <Box>
              <Text color={textColor} fontWeight='bold'>
                {t('edit.public_org_info', { defaultValue: 'Public Organization Information' })}
              </Text>
              <Text color={textColorSecondary} fontSize='sm'>
                {t('edit.public_org_info_description', {
                  defaultValue:
                    'If your organization already have a profile, ask the admin to invite you to your organization',
                })}
              </Text>
            </Box>
            <InputCustom
              formValue='name'
              label={t('name', { defaultValue: 'Name' })}
              placeholder={t('form.account_create.title_placeholder', {
                defaultValue: "Enter your organization's emial",
              })}
              type='text'
              required
            />
            <InputCustom
              formValue='website'
              label={t('website', { defaultValue: 'Website' })}
              placeholder={t('form.account_create.website_placeholder', {
                defaultValue: 'https://example.com',
              })}
              type='text'
              required
            />
            <FormControl>
              <FormLabel ms='4px' fontSize='sm' fontWeight='500' color={textColor}>
                <Trans i18nKey='description'>Description</Trans>
              </FormLabel>
              <Textarea {...register('description')} placeholder={t('form.account_create.description_placeholder')} />
            </FormControl>
          </Flex>
          <Flex flexDirection='column' gap={6}>
            <Box>
              <Text color={textColor} fontWeight='bold'>
                {t('edit.private_org_details', { defaultValue: 'Private Organization Details' })}
              </Text>
              <Text color={textColorSecondary} fontSize='sm'>
                {t('edit.private_org_details_description', {
                  defaultValue:
                    "Help us tailor your organization with information about your org. We won't share this info",
                })}
              </Text>
            </Box>
            <MembershipSizeTypesSelector name={'sizeSelect'} required />
            <OrganzationTypesSelector name={'typeSelect'} required />
            <CountriesTypesSelector name={'countrySelect'} required />
          </Flex>
          <Flex flexDirection='column' gap={6}>
            <Box>
              <Text color={textColor} fontWeight='bold'>
                {t('edit.customization', { defaultValue: 'Customization' })}
              </Text>
              <Text color={textColorSecondary} fontSize='sm'>
                {t('edit.customization.details', {
                  defaultValue: 'Define the params that will enhance the user experience and customize the voting page',
                })}
              </Text>
            </Box>
            <CustomizationTimeZoneSelector name={'timeZone'} required />
            <CustomizationLanguageSelector name={'language'} required />
            <FormControl>
              <FormLabel display='flex' ms={1} fontSize='sm' fontWeight='500' color={textColor} mb={2}>
                {t('edit.logo', {
                  defaultValue: 'Logo',
                })}
              </FormLabel>
              <Flex gap={2} alignItems='center'>
                <Input
                  placeholder={t('edit.upload_file', {
                    defaultValue: 'Upload a file',
                  })}
                />
                <Button bgColor='gray' minH={12} borderRadius='xl'>
                  {t('edit.update', { defaultValue: 'Upload' })}
                </Button>
              </Flex>
            </FormControl>
            <Box position='relative' outline='none' border='none'>
              <Text fontSize='sm' fontWeight='500' color={textColor} mb={2}>
                {t('edit.image', { defaultValue: 'Header Image' })}
              </Text>
              <Flex gap={2} flexDirection={{ base: 'column', md: 'row' }} alignItems='center'>
                <AspectRatio flexShrink={0} flexGrow={1} ratio={5 / 1} borderRadius='xl' overflow='hidden'>
                  <Image src={avatar} fallbackSrc={fallback} />
                </AspectRatio>
                <Button
                  minH={12}
                  borderRadius='xl'
                  sx={{
                    span: {
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 2,
                    },
                  }}
                >
                  <BsFillTrashFill />
                  <Text as='span'>{t('edit.remove', { defaultValue: 'Remove' })}</Text>
                </Button>
              </Flex>
              {correctAvatarFormat(avatar) && (
                <IconButton
                  aria-label={t('form.account_create.delete_image')}
                  icon={<BiTrash />}
                  onClick={() => setValue('avatar', '')}
                  position='absolute'
                  top={2}
                  right={2}
                  cursor='pointer'
                  size='xs'
                  fontSize='md'
                />
              )}
            </Box>
          </Flex>
          <Flex justifyContent='center'>
            <Button
              aria-label=''
              w='full'
              maxW='400px'
              sx={{
                span: {
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 2,
                },
              }}
            >
              <Box>
                <MdBrowserUpdated />
              </Box>
              <Text as='span'>
                {t('edit.udpate', {
                  defaultValue: 'Update',
                })}
              </Text>
            </Button>
          </Flex>
        </Flex>
      </Box>
    </FormProvider>
  )
}

export default EditProfile
