import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone/.'
import { Trans, useTranslation } from 'react-i18next'

export type UploaderProps = {
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T
  isDragActive: boolean
  isLoading?: boolean
  formats?: string[]
}

const ImageUploader = ({ getRootProps, getInputProps, isDragActive, isLoading, formats }: UploaderProps) => {
  const { t } = useTranslation()

  if (!formats) {
    formats = ['CSV', 'XLSX', 'ODS']
  }

  return (
    <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'} gap={2} {...getRootProps()}>
      <Box w='128px' h='128px' backgroundColor={'#eaeaea'} borderRadius={'full'}>
        <input {...getInputProps()} />
      </Box>

      <Trans
        i18nKey='uploader.click_or_drag_and_drop'
        components={{
          click: <Button variant={'outline'} colorScheme='gray' textAlign='center' />,
          drag: <Text as='span' textAlign='center' />,
          formats: <Text textAlign='center' fontSize='sm' />,
        }}
        values={{
          formats,
        }}
      />
    </Flex>
  )
}

const Uploader = ({ getRootProps, getInputProps, isDragActive, isLoading, formats }: UploaderProps) => {
  const { t } = useTranslation()

  if (!formats) {
    formats = ['CSV', 'XLSX', 'ODS']
  }

  return (
    <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'} gap={2} {...getRootProps()}>
      <Box w='128px' h='128px' backgroundColor={'#eaeaea'} borderRadius={'full'}>
        <input {...getInputProps()} />
      </Box>

      <Trans
        i18nKey='uploader.click_or_drag_and_drop'
        components={{
          click: <Button variant={'outline'} colorScheme='gray' textAlign='center' />,
          drag: <Text as='span' textAlign='center' />,
          formats: <Text textAlign='center' fontSize='sm' />,
        }}
        values={{
          formats,
        }}
      />
    </Flex>
  )
}

export default Uploader
export { ImageUploader }
