import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import { useOrganization } from '@vocdoni/react-providers'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Trans } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { Routes } from '~routes'
import { ParticipantPayload, useAddParticipants, useCensusInfo, usePublishCensus } from '~src/queries/census'

const CensusParticipants = () => {
  const navigate = useNavigate()
  const { organization } = useOrganization()
  const { id } = useParams<{ id: string }>()
  const { data: census } = useCensusInfo(id!)
  const addParticipants = useAddParticipants(id!)
  const publishCensus = usePublishCensus(id!)

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ParticipantPayload>()

  const [participants, setParticipants] = useState<ParticipantPayload[]>([])

  if (!organization || !census) return null

  const handleAddParticipant = (data: ParticipantPayload) => {
    if (!data.email && !data.phone) return

    setParticipants((prev) => [...prev, data])
    reset()
  }

  const handleSaveAndPublish = async () => {
    if (!participants.length) return

    await addParticipants.mutateAsync({ participants })
    await publishCensus.mutateAsync()

    navigate(Routes.dashboard.census.list)
  }

  return (
    <Box>
      <Heading size='lg' mb={6}>
        <Trans>Add Participants</Trans>
      </Heading>

      <form onSubmit={handleSubmit(handleAddParticipant)}>
        <VStack spacing={4} align='stretch' maxW='md' mb={8}>
          <FormControl>
            <FormLabel>
              <Trans>ParticipantNo</Trans>
            </FormLabel>
            <Input type='participantNo' placeholder='Participant number' {...register('participantNo')} />
          </FormControl>
          <FormControl>
            <FormLabel>
              <Trans>Email</Trans>
            </FormLabel>
            <Input type='email' placeholder='Enter email' {...register('email')} />
          </FormControl>

          <FormControl>
            <FormLabel>
              <Trans>Phone</Trans>
            </FormLabel>
            <Input type='tel' placeholder='Enter phone number' {...register('phone')} />
          </FormControl>

          <Button type='submit' colorScheme='primary' isLoading={isSubmitting}>
            <Trans>Add Participant</Trans>
          </Button>
        </VStack>
      </form>

      <Box mb={8}>
        <Heading size='md' mb={4}>
          <Trans>Participants List</Trans>
        </Heading>

        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>
                <Trans>ID</Trans>
              </Th>
              <Th>
                <Trans>Email</Trans>
              </Th>
              <Th>
                <Trans>Phone</Trans>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {participants.length === 0 ? (
              <Tr>
                <Td colSpan={3} textAlign='center'>
                  <Text color='gray.500'>
                    <Trans>No participants added yet</Trans>
                  </Text>
                </Td>
              </Tr>
            ) : (
              participants.map((participant) => (
                <Tr key={participant.participantNo}>
                  <Td>{participant.participantNo}</Td>
                  <Td>{participant.email || '-'}</Td>
                  <Td>{participant.phone || '-'}</Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </Box>

      <Stack direction='row' spacing={4} justify='flex-end'>
        <Button variant='outline' onClick={() => navigate(Routes.dashboard.census.list)}>
          <Trans>Cancel</Trans>
        </Button>
        <Button
          colorScheme='primary'
          onClick={handleSaveAndPublish}
          isLoading={addParticipants.isPending || publishCensus.isPending}
          isDisabled={participants.length === 0}
        >
          <Trans>Save & Publish</Trans>
        </Button>
      </Stack>
    </Box>
  )
}

export default CensusParticipants
