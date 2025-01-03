import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone/.'
import { Trans, useTranslation } from 'react-i18next'
import { FiUploadCloud } from 'react-icons/fi'

export type UploaderProps = {
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T
  isDragActive: boolean
  formats?: string[]
}

const Uploader = ({ getRootProps, getInputProps, isDragActive, formats }: UploaderProps) => {
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
      border={'1px solid'}
      borderColor={isDragActive ? 'input.drag_and_drop.border_active' : 'input.drag_and_drop.border'}
      cursor='pointer'
      borderRadius={12}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        border='1px solid'
        borderColor={'input.drag_and_drop.border'}
        borderRadius='lg'
        p={2}
      >
        <Icon as={FiUploadCloud} boxSize={10} />
      </Flex>
      <Box>
        {isDragActive ? (
          <Text textAlign='center'>{t('uploader.drop_here')}</Text>
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
