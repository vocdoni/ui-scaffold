import { Box, Checkbox, Grid, Icon, Text, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import ModalPro from '../ModalPro'
import { UnimplementedVotingType, useUnimplementedVotingType } from './useUnimplementedVotingType'
import { useVotingType, VotingType } from './useVotingType'

const VotingTypes = () => {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [reason, setReason] = useState('')

  const { defined, details } = useVotingType()
  const { defined: unDefined, details: undDetails } = useUnimplementedVotingType()

  console.log(reason)
  return (
    <>
      <ModalPro isOpen={isOpen} onClose={onClose} reason={reason} />
      <Box>
        <Text className='process-create-title'>{t('process_create.question.voting_type.title')}</Text>
        <Text fontSize='sm' color='process_create.description' mb={5}>
          {t('process_create.question.voting_type.description')}
        </Text>

        <Grid
          gridTemplateColumns={{
            base: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            xl3: 'repeat(5, 1fr)',
          }}
          gap={5}
        >
          {defined.map((ct: VotingType, index: number) => (
            <Checkbox key={index} variant='radiobox' isChecked={true}>
              <Box>
                <Icon as={details[ct].icon} />
                <Box>
                  <Trans
                    i18nKey={details[ct].title}
                    components={{
                      p: <Text />,
                    }}
                  />
                </Box>
              </Box>
              <Text>{details[ct].description}</Text>
            </Checkbox>
          ))}

          {unDefined.map((ct: UnimplementedVotingType, index: number) => (
            <Checkbox key={index} variant='radiobox' isChecked={true}>
              <Box>
                <Icon as={undDetails[ct].icon} />
                <Box>
                  <Trans
                    i18nKey={undDetails[ct].title}
                    components={{
                      p: <Text />,
                    }}
                  />
                </Box>
              </Box>
              <Text as='span'>Pro</Text>
              <Text>{undDetails[ct].description}</Text>
              <Box
                onClick={() => {
                  setReason(undDetails[ct].title)
                  onOpen()
                }}
              />
            </Checkbox>
          ))}
        </Grid>
      </Box>
    </>
  )
}

export default VotingTypes
