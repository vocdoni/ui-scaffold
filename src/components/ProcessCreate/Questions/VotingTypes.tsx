import { Box, Checkbox, Flex, Icon, Text, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { BiCheckDouble } from 'react-icons/bi'
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
        <Flex flexWrap='wrap' gap={5}>
          <Checkbox variant='radiobox' flex='0 0 30%' isChecked={true}>
            <Box>
              <Icon as={BiCheckDouble} />
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
          <Checkbox variant='radiobox' flex='0 0 30%'>
            <Box>
              <Icon as={BiCheckDouble} />
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
          <Checkbox variant='radiobox' flex='0 0 30%'>
            <Box>
              <Icon as={BiCheckDouble} />
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
          <Checkbox variant='radiobox' flex='0 0 30%'>
            <Box>
              <Icon as={BiCheckDouble} />
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
          <Checkbox variant='radiobox' flex='0 0 30%'>
            <Box>
              <Icon as={BiCheckDouble} />
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
        </Flex>
      </Box>
    </>
  )
}

export default VotingTypes
