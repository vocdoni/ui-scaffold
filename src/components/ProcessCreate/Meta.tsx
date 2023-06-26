import { InfoOutlineIcon } from '@chakra-ui/icons'
import { Box, Flex, FormControl, FormErrorMessage, FormHelperText, Input, Text, Textarea } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { fieldMapErrorMessage, isInvalidFieldMap } from '../../constants'

const CreateProcessMeta = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const { t } = useTranslation()

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }

  return (
    <Flex flex='1' flexDirection={{ base: 'column', md: 'row' }} gap={{ base: 4, md: 10 }}>
      <Box flexBasis='30%'>
        <Text fontWeight='bold' mb={2}>
          {t('form.process_create.meta.title')}
        </Text>
        <Text fontSize='sm' color='process_create.meta_description'>
          {t('form.process_create.meta.description')}
        </Text>
      </Box>
      <Flex flex='1' flexDirection='column' gap={4}>
        <FormControl isInvalid={isInvalidFieldMap(errors, `title`)} mb={1}>
          <Input
            {...register('title', { required })}
            placeholder={t('form.process_create.meta.title_placeholder').toString()}
          />
          {!!errors.title ? (
            <FormErrorMessage>{fieldMapErrorMessage(errors, `title`)}</FormErrorMessage>
          ) : (
            <FormHelperText>
              <InfoOutlineIcon />
              <Text>{t('form.process_create.meta.title_helper')}</Text>
            </FormHelperText>
          )}
        </FormControl>

        <FormControl isInvalid={isInvalidFieldMap(errors, `description`)} mb={1}>
          <Textarea
            {...register('description')}
            placeholder={t('form.process_create.meta.description_placeholder').toString()}
            variant='outline'
          />
          {!!errors.description ? (
            <FormErrorMessage>{fieldMapErrorMessage(errors, `description`)}</FormErrorMessage>
          ) : (
            <FormHelperText>
              <InfoOutlineIcon />
              <Text>{t('form.process_create.meta.description_helper')}</Text>
            </FormHelperText>
          )}
        </FormControl>
      </Flex>
    </Flex>
  )
}

export default CreateProcessMeta
