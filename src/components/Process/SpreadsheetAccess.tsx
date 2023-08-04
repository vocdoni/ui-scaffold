import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { SpreadsheetManager } from '@components/ProcessCreate/Census/Spreadsheet/spreadsheet-manager'
import { useClient, useElection } from '@vocdoni/chakra-components'
import { dotobject, VocdoniSDKClient } from '@vocdoni/sdk'
import { SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

export const SpreadsheetAccess = ({ setConnected }: { setConnected: SetStateAction<boolean> }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [params] = useSearchParams()
  const [loading, setLoading] = useState<boolean>(false)
  const toast = useToast()
  const { t } = useTranslation()
  const { env } = useClient()
  const { election, setClient } = useElection()
  const fields = dotobject(election, 'meta.census.fields')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>()

  // open modal when accessing via `?auth`
  useEffect(() => {
    if (isOpen) return

    if (params.has('auth')) {
      onOpen()
    }
  }, [params])

  const onSubmit = async (vals: any) => {
    try {
      setLoading(true)
      // create wallet and client
      const wallet = SpreadsheetManager.walletFromRow(election?.organizationId, Object.values(vals))
      const address = await wallet.getAddress()
      const client = new VocdoniSDKClient({
        env,
        wallet,
        electionId: election?.id,
      })
      // check if is in census
      if (!(await client.isInCensus())) {
        return toast({
          status: 'error',
          title: t('error.wrong_data_title'),
          description: t('error.wrong_data_description'),
        })
      }
      // in case of success, set connected and currently defined client
      setConnected(true)
      setClient(client)
      // also, close the modal
      onClose()
    } catch (e) {
      if ('message' in e) {
        return toast({
          status: 'error',
          description: e.message,
        })
      }
      console.error('there was an unknown error checking spreadsheet data:', e)
    } finally {
      setLoading(false)
    }
  }

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }

  return (
    <>
      <Button onClick={onOpen} colorScheme='primary'>
        <Trans i18nKey='spreadsheet.access_button'>Identify</Trans>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>
              <Trans i18nKey='spreadsheet.modal_title'>You need to log in first</Trans>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {fields.map((field) => (
                <FormControl key={field} isInvalid={!!errors[field]}>
                  <FormLabel>{field}</FormLabel>
                  <Input {...register(field, { required })} />
                  <FormErrorMessage>{errors[field]?.message?.toString()}</FormErrorMessage>
                </FormControl>
              ))}
            </ModalBody>

            <ModalFooter>
              <Button variant='ghost' mr={3} onClick={onClose}>
                {t('close')}
              </Button>
              <Button type='submit' colorScheme='primary'>
                <Trans i18nKey='spreadsheet.access_button'>Identify</Trans>
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
