import { Box, Flex, FormControl, FormErrorMessage, Input, Text, Textarea } from '@chakra-ui/react'
import { fieldMapErrorMessage, isInvalidFieldMap } from '@constants'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

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
          <FormErrorMessage>{fieldMapErrorMessage(errors, `title`)}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={isInvalidFieldMap(errors, `description`)} mb={1}>
          <Textarea
            {...register('description')}
            placeholder={t('form.process_create.meta.description_placeholder').toString()}
            variant='outline'
          />
          <FormErrorMessage>{fieldMapErrorMessage(errors, `description`)}</FormErrorMessage>
        </FormControl>
      </Flex>
    </Flex>
  )
}

export default CreateProcessMeta
