import {
  Button,
  FormControl,
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
  useToast
} from '@chakra-ui/react'
import { SpreadsheetManager } from '@components/ProcessCreate/Census/Spreadsheet/spreadsheet-manager'
import { useClient, useElection } from '@vocdoni/chakra-components'
import { dotobject, VocdoniSDKClient } from '@vocdoni/sdk'
import { SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'

export const SpreadsheetAccess = ({ setConnected }: { setConnected: SetStateAction<boolean> }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loading, setLoading] = useState<boolean>(false)
  const toast = useToast()
  const { t } = useTranslation()
  const { env } = useClient()
  const { election, setClient } = useElection()
  const fields = dotobject(election, 'meta.census.fields')
  const { register, handleSubmit, formState: { errors } } = useForm<any>()

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
      if (!await client.isInCensus()) {
        return toast({
          status: 'error',
          title: 'Wrong data',
          description: 'The specified data is not correct',
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

  return (<>
    <Button onClick={onOpen}>Identifica't</Button>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader><Trans i18nKey='spreadsheet.login.title'>You need to log in first</Trans></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {
              fields.map((field) => (
                <FormControl key={field}>
                  <FormLabel>{field}</FormLabel>
                  <Input {...register(field)} />
                </FormControl>
              ))
            }
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button type='submit'>Login</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  </>)
}
