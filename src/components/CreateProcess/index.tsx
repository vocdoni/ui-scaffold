import { Button, useDisclosure } from '@chakra-ui/react'
import { useClientContext } from '@vocdoni/react-components'
import { VocdoniSDKClient } from '@vocdoni/sdk'
import { useContext, useEffect, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { MODAL_TYPE } from '../../constants/modalType'
import { UpdatedBalanceContext } from '../../lib/contexts/UpdatedBalanceContext'
import {
  addQuestions,
  getPlainCensus,
  getWeightedCensus,
  handleElection,
} from '../../lib/sdk/sdk'
import ModalWrapper from '../Modals/ModalWrapper'
import WrapperForm from '../Wrappers/WrapperForm'
import CreateProcessAddresses from './CreateProcessAddresses'
import CreateProcessHeader from './CreateProcessHeader'
import CreateProcessQuestions from './CreateProcessQuestions'
import CreateProcessSettings from './CreateProcessSettings'

export interface FormValues {
  titleProcess: string
  descriptionProcess: string
  dates: {
    start: Date
    end: Date
  }
  electionType: {
    autoStart: boolean
    interruptible: boolean
    secretUntilTheEnd: boolean
  }
  maxVoteOverwrites: number
  weightedVote: boolean
  addresses: Address[]
  questions: Question[]
}

export interface Question {
  titleQuestion: string
  descriptionQuestion: string
  options: Option[]
}

export interface Option {
  option: string
}

export interface Address {
  address: string
  weight: number
}

const CreateProcess = () => {
  const { client, account } = useClientContext()
  const { updateBalance } = useContext(UpdatedBalanceContext)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modalType, setModalType] = useState(MODAL_TYPE.LOADING)

  const methods = useForm<FormValues>({
    defaultValues: {
      titleProcess: '',
      descriptionProcess: '',
      dates: {
        start: undefined,
        end: undefined,
      },
      electionType: {
        autoStart: true,
        interruptible: true,
        secretUntilTheEnd: true,
      },
      maxVoteOverwrites: 0,
      weightedVote: false,
      addresses: [
        { address: account?.address, weight: 0 },
        { address: '', weight: 0 },
      ],
      questions: [
        {
          titleQuestion: '',
          descriptionQuestion: '',
          options: [{ option: '' }, { option: '' }],
        },
      ],
    },
  })

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    try {
      onOpen()
      await handleSubmitElection(data, client)
      updateBalance()
      onClose()
      setModalType(MODAL_TYPE.SUCCESS)
      onOpen()
    } catch (err) {
      throw new Error()
    } finally {
    }
  }

  useEffect(() => {
    if (!account) return
    methods.setValue(`addresses.${0}.address`, account.address)
  }, [account, methods])

  return (
    <FormProvider {...methods}>
      <ModalWrapper type={modalType} isOpen={isOpen} onClose={onClose} />
      <WrapperForm onSubmit={methods.handleSubmit(onSubmit)}>
        <>
          <CreateProcessHeader />
          <CreateProcessSettings />
          <CreateProcessAddresses />
          <CreateProcessQuestions />
          <Button type='submit' _dark={{ bg: 'black.c90' }}>
            Submit
          </Button>
        </>
      </WrapperForm>
    </FormProvider>
  )
}

const handleSubmitElection = async (
  data: FormValues,
  client: VocdoniSDKClient
) => {
  await client.createAccount()
  let census

  if (data.weightedVote) census = await getWeightedCensus(data.addresses)
  else {
    const addresses = data.addresses.map(add => add.address)
    census = await getPlainCensus(addresses)
  }

  const election = await handleElection(data, census)

  await addQuestions(election, data.questions)

  await client.createElection(election)
}

export default CreateProcess
