import { InfoOutlineIcon } from '@chakra-ui/icons'
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  IconButton,
  Img,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react'
import { useClient } from '@vocdoni/chakra-components'
import { CSSProperties, useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BiTrash } from 'react-icons/bi'
import fallback from '/assets/default-avatar.png'

interface EditFormFields {
  name: string
  description: string
  picture: string | FileList | undefined
}

const EditProfile = () => {
  const { account, client } = useClient()
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }

  const {
    clearErrors,
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: account?.account.name.default || '',
      description: account?.account.description.default || '',
      picture: account?.account.avatar,
    },
  })

  const [preview, setPreview] = useState(account?.account.avatar)

  const handleDelete = () => {
    setPreview('')
  }

  const onDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0]
    const fileReader = new FileReader()

    fileReader.onload = () => {
      const url = fileReader.result
      if (typeof url === 'string') {
        setPreview(url)
      }
    }
    fileReader.readAsDataURL(file)
  }, [])

  const { getRootProps, getInputProps, isDragAccept, isDragReject, fileRejections } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.png'],
    },
    onDrop,
  })

  useEffect(() => {
    if (!fileRejections.length) return

    setError('picture', { type: 'custom', message: 'Rejected is not a correct format' })

    const cleanPictureError = setTimeout(() => {
      clearErrors('picture')
    }, 2000)

    return () => {
      clearTimeout(cleanPictureError)
      clearErrors('picture')
    }
  }, [fileRejections.length])

  const dropzoneStyle: CSSProperties = {
    ...(isDragAccept && { borderColor: '#00e676' }),
    ...(isDragReject && { borderColor: '#ff1744' }),
  }

  const onSubmit: SubmitHandler<EditFormFields> = async (values: EditFormFields) => {
    //Set picture before send
    console.log(values)
  }

  return (
    <>
      <Button onClick={onOpen} display='flex' justifyContent='end' variant='dropdown'>
        {t('menu.edit_profile')}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={3} minW={{ md: '700px' }}>
          <Box>
            <ModalHeader>{t('menu.edit_profile')}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={5}>
              <Flex
                as='form'
                direction='column'
                gap={6}
                onSubmit={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  handleSubmit(onSubmit)(e)
                }}
              >
                <Flex alignItems='center' gap={5}>
                  <Box position='relative'>
                    <AspectRatio
                      flexShrink={0}
                      w={{ base: 20, md: 40 }}
                      ratio={1.25 / 1}
                      borderRadius='lg'
                      overflow='hidden'
                    >
                      <Img src={preview ? preview : fallback} />
                    </AspectRatio>
                    {preview && (
                      <IconButton
                        aria-label='trash icon'
                        icon={<BiTrash />}
                        onClick={handleDelete}
                        position='absolute'
                        top={2}
                        right={2}
                        cursor='pointer'
                        size='xs'
                        fontSize='17px'
                      />
                    )}
                  </Box>
                  <FormControl
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'
                    border='1px dashed'
                    height='100px'
                    borderColor='#eeeeee'
                    backgroundColor='#fafafa'
                    color='#bdbdbd'
                    outline='none'
                    transition='border .24s ease-in-out'
                    {...getRootProps({ style: dropzoneStyle })}
                    isInvalid={!!errors.picture}
                  >
                    <input {...getInputProps()} />
                    {!errors.picture && (
                      <>
                        {!isDragAccept && !isDragReject && (
                          <Text>Drag 'n' drop some files here, or click to select files</Text>
                        )}
                        {isDragAccept && <Text>.jpeg and .png will be accept</Text>}
                        {isDragReject && <Text>Some files will be rejected</Text>}
                      </>
                    )}
                    <FormErrorMessage>{errors?.picture?.message?.toString()}</FormErrorMessage>
                  </FormControl>
                </Flex>
                <FormControl isInvalid={!!errors.name}>
                  <Input
                    type='text'
                    {...register('name', { required })}
                    mb={1}
                    placeholder={t('form.account_create.title_placeholder').toString()}
                  />
                  {!!errors.name ? (
                    <FormErrorMessage>{errors.name?.message?.toString()}</FormErrorMessage>
                  ) : (
                    <FormHelperText>
                      <InfoOutlineIcon />
                      <Text>{t('form.account_create.title_helper')}</Text>
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl>
                  <Textarea
                    {...register('description')}
                    placeholder={t('form.account_create.description_placeholder').toString()}
                  />
                  <FormHelperText>
                    <InfoOutlineIcon />
                    <Text> {t('form.account_create.description_helper')}</Text>
                  </FormHelperText>
                </FormControl>
                <Button type='submit' colorScheme='primary'>
                  {t('menu.edit_profile_btn')}
                </Button>
              </Flex>
            </ModalBody>
          </Box>
        </ModalContent>
      </Modal>
    </>
  )
}

const fileToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader()

    fileReader.addEventListener('loadend', () => resolve(fileReader.result as string))
    fileReader.addEventListener('abort', () => reject())
    fileReader.addEventListener('error', () => reject())

    fileReader.readAsDataURL(file)
  })

export default EditProfile
