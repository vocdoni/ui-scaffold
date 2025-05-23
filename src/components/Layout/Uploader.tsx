import { Box, Button, Flex, Icon, Spinner, Text } from '@chakra-ui/react'
import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone/.'
import { Trans, useTranslation } from 'react-i18next'
import { FiUploadCloud } from 'react-icons/fi'
import { LuUpload } from 'react-icons/lu'

export type UploaderProps = {
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T
  isDragActive: boolean
  isLoading?: boolean
  formats?: string[]
}

const ImageUploader = ({ getRootProps, getInputProps, formats, isDragActive }: UploaderProps) => {
  const { t } = useTranslation()

  if (!formats) {
    formats = ['PNG', 'JPG', 'JPEG']
  }

  return (
    <Flex flexDirection='column' justifyContent='center' alignItems='center' gap={2} {...getRootProps()}>
      <Box
        w='128px'
        h='128px'
        backgroundColor='gray.200'
        cursor='pointer'
        borderRadius='full'
        border='2px solid'
        borderColor={isDragActive ? 'green.400' : 'transparent'}
        boxShadow={isDragActive ? '0 0 0 4px rgba(72, 187, 120, 0.4)' : 'none'}
        transition='all 0.2s ease-in-out'
      >
        <input {...getInputProps()} />
      </Box>
      <Button variant='outline' leftIcon={<Icon as={LuUpload} mr={2} boxSize={4} />}>
        {t('uploader.click_or_drag_and_drop_image', { defaultValue: 'Upload Image' })}
      </Button>
    </Flex>
  )
}

const Uploader = ({ getRootProps, getInputProps, isDragActive, isLoading, formats }: UploaderProps) => {
  const { t } = useTranslation()

  if (!formats) {
    formats = ['CSV', 'XLSX', 'ODS']
  }

  return (
    <Flex
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      gap={5}
      p={10}
      border='1px solid'
      borderColor={isDragActive ? 'input.drag_and_drop.border_active' : 'input.drag_and_drop.border'}
      cursor='pointer'
      borderRadius={12}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Flex
        justifyContent='center'
        alignItems='center'
        border='1px solid'
        borderColor='input.drag_and_drop.border'
        borderRadius='lg'
        p={2}
      >
        <Icon as={FiUploadCloud} boxSize={10} />
      </Flex>
      <Box>
        {isDragActive ? (
          <Text textAlign='center'>{t('uploader.drop_here')}</Text>
        ) : isLoading ? (
          <Spinner />
        ) : (
          <Trans
            i18nKey='uploader.click_or_drag_and_drop'
            components={{
              click: <Text as='span' textAlign='center' color='input.drag_and_drop.text' />,
              drag: <Text as='span' textAlign='center' />,
              formats: <Text textAlign='center' fontSize='sm' />,
            }}
            values={{
              formats,
            }}
          />
        )}
      </Box>
    </Flex>
  )
}

export default Uploader
export { ImageUploader }
