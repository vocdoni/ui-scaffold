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
import { Trans } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { Routes } from '~routes'
import { useAddParticipants, useCensusInfo, usePublishCensus } from '~src/queries/census'

interface ParticipantInput {
  id: string
  email?: string
  phone?: string
}

const CensusParticipants = () => {
  const navigate = useNavigate()
  const { organization } = useOrganization()
  const { id } = useParams<{ id: string }>()
  const [participants, setParticipants] = useState<ParticipantInput[]>([])
  const [participantId, setParticipantId] = useState('')
  const [participantEmail, setParticipantEmail] = useState('')
  const [participantPhone, setParticipantPhone] = useState('')

  const { data: census } = useCensusInfo(id!)
  const addParticipants = useAddParticipants(id!)
  const publishCensus = usePublishCensus(id!)

  if (!organization || !census) return null

  const handleAddParticipant = (e: React.FormEvent) => {
    e.preventDefault()

    if (!participantId) return
    if (!participantEmail && !participantPhone) return

    setParticipants([
      ...participants,
      {
        id: participantId,
        email: participantEmail || undefined,
        phone: participantPhone || undefined,
      },
    ])

    // Clear form
    setParticipantId('')
    setParticipantEmail('')
    setParticipantPhone('')
  }

  const handleSubmit = async () => {
    if (!participants.length) return

    await addParticipants.mutateAsync({ participants })
    await publishCensus.mutateAsync()

    // Navigate back to census list
    navigate(Routes.dashboard.census.list)
  }

  return (
    <Box>
      <Heading size='lg' mb={6}>
        <Trans>Add Participants</Trans>
      </Heading>

      <form onSubmit={handleAddParticipant}>
        <VStack spacing={4} align='stretch' maxW='md' mb={8}>
          <FormControl isRequired>
            <FormLabel>
              <Trans>Participant ID</Trans>
            </FormLabel>
            <Input
              value={participantId}
              onChange={(e) => setParticipantId(e.target.value)}
              placeholder='Enter participant ID'
            />
          </FormControl>

          <FormControl>
            <FormLabel>
              <Trans>Email</Trans>
            </FormLabel>
            <Input
              type='email'
              value={participantEmail}
              onChange={(e) => setParticipantEmail(e.target.value)}
              placeholder='Enter email'
            />
          </FormControl>

          <FormControl>
            <FormLabel>
              <Trans>Phone</Trans>
            </FormLabel>
            <Input
              type='tel'
              value={participantPhone}
              onChange={(e) => setParticipantPhone(e.target.value)}
              placeholder='Enter phone number'
            />
          </FormControl>

          <Button type='submit' colorScheme='primary'>
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
                <Tr key={participant.id}>
                  <Td>{participant.id}</Td>
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
          onClick={handleSubmit}
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
