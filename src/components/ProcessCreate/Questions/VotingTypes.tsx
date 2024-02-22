import { Box, Checkbox, Grid, Icon, Text, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { GiChoice } from 'react-icons/gi'
import { GoNumber } from 'react-icons/go'
import { HiCheckBadge } from 'react-icons/hi2'
import { ImListNumbered } from 'react-icons/im'
import { MdOutlineLibraryAddCheck } from 'react-icons/md'
import ModalPro from '../ModalPro'

const VotingTypes = () => {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [reason, setReason] = useState('')

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
            xl: 'repeat(5, 1fr)',
          }}
          gap={5}
        >
          <Checkbox variant='radiobox' isChecked={true}>
            <Box>
              <Icon as={GiChoice} />
              <Box>
                <Trans
                  i18nKey='process_create.question.single_choice.title'
                  components={{
                    p: <Text />,
                  }}
                />
              </Box>
            </Box>
            <Text>{t('process_create.question.single_choice.description')}</Text>
          </Checkbox>
          <Checkbox variant='radiobox'>
            <Box>
              <Icon as={MdOutlineLibraryAddCheck} />
              <Box>
                <Trans
                  i18nKey='process_create.question.multi_choice.title'
                  components={{
                    p: <Text />,
                  }}
                />
              </Box>
            </Box>
            <Text as='span'>Pro</Text>
            <Text>{t('process_create.question.multi_choice.description')}</Text>
            <Box
              onClick={() => {
                setReason('multiple choice')
                onOpen()
              }}
            />
          </Checkbox>
          <Checkbox variant='radiobox'>
            <Box>
              <Icon as={HiCheckBadge} />
              <Text>{t('process_create.question.approval_voting.title')}</Text>
            </Box>
            <Text as='span'>Pro</Text>
            <Text>{t('process_create.question.approval_voting.description')}</Text>
            <Box
              onClick={() => {
                setReason('approval voting')
                onOpen()
              }}
            />
          </Checkbox>
          <Checkbox variant='radiobox'>
            <Box>
              <Icon as={GoNumber} />
              <Text>{t('process_create.question.participation_budgeting.title')}</Text>
            </Box>
            <Text as='span'>Pro</Text>
            <Text>{t('process_create.question.participation_budgeting.description')}</Text>
            <Box
              onClick={() => {
                setReason('participatory budgeting')
                onOpen()
              }}
            />
          </Checkbox>
          <Checkbox variant='radiobox'>
            <Box>
              <Icon as={ImListNumbered} />
              <Box>
                <Trans
                  i18nKey='process_create.question.borda_count.title'
                  components={{
                    p: <Text />,
                  }}
                />
              </Box>
            </Box>
            <Text as='span'>Pro</Text>
            <Text>{t('process_create.question.borda_count.description')}</Text>
            <Box
              onClick={() => {
                setReason('borda count')
                onOpen()
              }}
            />
          </Checkbox>
        </Grid>
      </Box>
    </>
  )
}

export default VotingTypes
