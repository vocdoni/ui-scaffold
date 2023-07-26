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
import { useRef, useState } from 'react'
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
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleUrl = async (file: File) => {
    try {
      const dataUrl = await fileToDataUrl(file)
      setPreview(dataUrl as string)
    } catch (err) {
      setPreview('')
    }
  }

  const handleDelete = () => {
    setPreview('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleUrl(file)
    }
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
                  <Input
                    type='file'
                    ref={(e) => {
                      fileInputRef.current = e
                    }}
                    border='none'
                    mt={3}
                    p={0}
                    onChange={handleFileChange}
                  />
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
