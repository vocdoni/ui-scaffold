import { Box, Checkbox, Grid, Icon, Text, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { CgMoreO } from 'react-icons/cg'
import ModalPro from '../ModalPro'
import { UnimplementedVotingType, useUnimplementedVotingType } from './useUnimplementedVotingType'
import { useVotingType, VotingType } from './useVotingType'

const VotingTypes = () => {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [reason, setReason] = useState('')

  const { defined, details } = useVotingType()
  const { defined: unDefined, details: undDetails } = useUnimplementedVotingType()

  const [showProCards, setShowProCards] = useState(false)

  return (
    <>
      <ModalPro isOpen={isOpen} onClose={onClose} reason={reason} />
      <Box>
        <Text className='process-create-title'>{t('process_create.question.voting_type.title')}</Text>
        <Text fontSize='sm' color='process_create.description' mb={5}>
          {t('process_create.question.voting_type.description')}
        </Text>

        <Grid gridTemplateColumns='repeat(auto-fill, minmax(250px, 1fr))' gap={5}>
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
          {!!unDefined.length && (
            <Checkbox
              variant='radiobox'
              transform={showProCards ? 'scale(0.92)' : ''}
              sx={{
                '& span:first-of-type': {
                  display: 'none',
                },
              }}
            >
              <Box>
                <Icon as={CgMoreO} />
                <Box>
                  <Trans i18nKey={t('process_create.question.others.title')} />
                </Box>
              </Box>
              <Text>{t('process_create.question.others.description')}</Text>
              <Box onClick={() => setShowProCards((prev) => !prev)} />
            </Checkbox>
          )}
        </Grid>
        {showProCards && (
          <>
            <Text className='process-create-title' mt={5} mb={3}>
              {t('process_create.question.voting_type.pro')}
            </Text>
            <Grid gridTemplateColumns='repeat(auto-fill, minmax(250px, 1fr))' gap={5}>
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
          </>
        )}
      </Box>
    </>
  )
}

export default VotingTypes
