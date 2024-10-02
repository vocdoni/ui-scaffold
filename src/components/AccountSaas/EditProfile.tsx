import { AspectRatio, Box, Flex, FormControl, FormLabel, IconButton, Image, Input, Text } from '@chakra-ui/react'
import { Button } from '@vocdoni/chakra-components'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BiTrash } from 'react-icons/bi'
import { BsFillTrashFill } from 'react-icons/bs'
import { MdBrowserUpdated } from 'react-icons/md'
import { OrgInterface } from '~components/AccountSaas/AccountTypes'
import { PrivateOrgForm, PrivateOrgFormData, PublicOrgForm } from '~components/AccountSaas/Layout'
import {
  CustomizationLanguageSelector,
  CustomizationTimeZoneSelector,
  SelectOptionType,
} from '~components/Layout/SaasSelector'
import { REGEX_AVATAR } from '~constants'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'
import fallback from '/assets/default-avatar.png'
import { useSaasOrganization } from '~components/AccountSaas/queries'

type FormData = CustomOrgFormData &
  PrivateOrgFormData &
  Pick<OrgInterface, 'name' | 'website' | 'description' | 'logo' | 'header' | 'communications'>

const EditProfile = () => {
  const { data } = useSaasOrganization()

  const { t } = useTranslation()

  const methods = useForm<FormData>({
    defaultValues: {
      name: data?.name || '',
      website: data?.website || '',
      description: data?.description || '',
      sizeSelect: data?.size && {
        value: data.size,
      },
      typeSelect: data?.type && {
        value: data.type,
      },
      countrySelect: data?.country && {
        value: data.country || '',
      },
      communications: data?.communications || false,
      timeZoneSelect: data?.timezone && {
        value: data.timezone,
      },
      languageSelect: data?.language && {
        value: data.language,
      },
      logo: data?.logo || '',
      header: data?.header || '',
    },
  })

  const { handleSubmit } = methods

  const onSubmit: SubmitHandler<FormData> = async (values: FormData) => {
    const newInfo = {
      name: values.name,
      website: values.website,
      description: values.description,
      size: values.sizeSelect?.value,
      type: values.typeSelect?.value,
      country: values.countrySelect?.value,
      timeZone: values.timeZoneSelect.value,
      language: values.languageSelect.value,
      logo: values.logo,
      header: values.header,
    }
    console.log(values, newInfo)
  }

  return (
    <FormProvider {...methods}>
      <Box height='100%' maxH='100%' overflowY='auto'>
        <Flex
          as='form'
          id='process-create-form'
          direction='column'
          gap={6}
          maxW='600px'
          mx='auto'
          onSubmit={(e) => {
            e.stopPropagation()
            e.preventDefault()
            handleSubmit(onSubmit)(e)
          }}
        >
          <PublicOrgForm />
          <PrivateOrgForm />
          <CustomizeOrgForm />
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
                {t('udpate', {
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

export type CustomOrgFormData = {
  timeZoneSelect: SelectOptionType
  languageSelect: SelectOptionType
}

const CustomizeOrgForm = () => {
  const { t } = useTranslation()
  const { textColor, textColorSecondary } = useDarkMode()
  const { watch, setValue } = useForm<FormData>()

  const avatar = watch('logo')
  const correctAvatarFormat = (val: string) => REGEX_AVATAR.test(val)

  return (
    <>
      <Box>
        <Text color={textColor} fontWeight='bold'>
          {t('customization', { defaultValue: 'Customization' })}
        </Text>
        <Text color={textColorSecondary} fontSize='sm'>
          {t('edit_saas_profile.customization_details', {
            defaultValue: 'Define the params that will enhance the user experience and customize the voting page',
          })}
        </Text>
      </Box>
      <Flex flexDirection='column' gap={6} px={{ base: 5, md: 10 }}>
        <CustomizationTimeZoneSelector name={'timeZoneSelect'} required />
        <CustomizationLanguageSelector name={'languageSelect'} required />
        <FormControl>
          <FormLabel display='flex' ms={1} fontSize='sm' fontWeight='500' color={textColor} mb={2}>
            {t('logo', {
              defaultValue: 'Logo',
            })}
          </FormLabel>
          <Flex gap={2} alignItems='center'>
            <Input
              placeholder={t('edit_saas_profile.upload_file', {
                defaultValue: 'Upload a file',
              })}
            />
            <Button bgColor='gray' minH={12} borderRadius='xl'>
              {t('upload', { defaultValue: 'Upload' })}
            </Button>
          </Flex>
        </FormControl>
        <Box position='relative' outline='none' border='none'>
          <Text fontSize='sm' fontWeight='500' color={textColor} mb={2}>
            {t('edit_saas_profile.header_image', { defaultValue: 'Header Image' })}
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
              <Text as='span'>{t('remove', { defaultValue: 'Remove' })}</Text>
            </Button>
          </Flex>
          {correctAvatarFormat(avatar) && (
            <IconButton
              aria-label={t('form.account_create.delete_image')}
              icon={<BiTrash />}
              onClick={() => setValue('logo', '')}
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
    </>
  )
}

export default EditProfile
