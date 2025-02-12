import { Box, Button, Flex, ModalBody, ModalFooter, ModalHeader, Text, useMultiStyleConfig } from '@chakra-ui/react'
import { useConfirm } from '@vocdoni/chakra-components'
import { ElectionResultsTypeNames, IQuestion, PublishedElection } from '@vocdoni/sdk'
import { FieldValues } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import confirmImg from '/assets/spreadsheet-confirm-modal.jpg'

export const ConfirmVoteModal = ({ election, answers }: { election: PublishedElection; answers: FieldValues }) => {
  const { t } = useTranslation()
  const styles = useMultiStyleConfig('ConfirmModal')
  const { cancel, proceed } = useConfirm()

  return (
    <>
      <ModalHeader>
        <Box bgImage={`url(${confirmImg})`} />
      </ModalHeader>
      <ModalBody display='flex' flexDirection='column' gap={5} p={0} mb={2}>
        <Text>{t('process.spreadsheet.confirm.description')}</Text>
        <Flex
          flexDirection='column'
          maxH='200px'
          overflowY='scroll'
          boxShadow='rgba(128, 128, 128, 0.42) 1px 1px 1px 1px'
          px={2}
          borderRadius='lg2'
        >
          {election.questions.map((q, i) => (
            <Box key={i}>
              <Box py={2}>
                <Text display='flex' flexDirection='column' gap={1} mb={1}>
                  <Trans
                    i18nKey='process.spreadsheet.confirm.question'
                    components={{
                      span: <Text as='span' fontWeight='bold' whiteSpace='nowrap' />,
                    }}
                    values={{
                      answer: q.title.default,
                      number: i + 1,
                    }}
                  />
                </Text>
                {election.resultsType.name === ElectionResultsTypeNames.SINGLE_CHOICE_MULTIQUESTION ? (
                  <ConfirmQuestion question={q} answers={answers} index={i} />
                ) : (
                  <ConfirmMultiquestion question={q} answers={answers} />
                )}
              </Box>
              {i + 1 !== election.questions.length && <Box h='1px' bgColor='lightgray' />}
            </Box>
          ))}
        </Flex>
      </ModalBody>
      <ModalFooter sx={styles.footer}>
        <Button onClick={cancel!} variant='ghost' sx={styles.cancel}>
          {t('cc.confirm.cancel')}
        </Button>
        <Button onClick={proceed!} sx={styles.confirm}>
          {t('cc.confirm.confirm')}
        </Button>
      </ModalFooter>
    </>
  )
}

const ConfirmMultiquestion = ({ question, answers }: { question: IQuestion; answers: FieldValues }) => {
  const { t } = useTranslation()

  // Add abstain option to choices if needed
  const choices = [...question.choices]
  if (answers[0].includes('-1')) {
    choices[-1] = {
      title: {
        default: t('cc.vote.abstain'),
      },
      value: -1,
    }
  }

  return (
    <Text display='flex' flexDirection='column' gap={1}>
      <Trans
        i18nKey='process.spreadsheet.confirm.options'
        components={{
          span: <Text as='span' fontWeight='bold' whiteSpace='nowrap' />,
        }}
        values={{
          answers:
            answers[0].length === 0
              ? t('process.spreadsheet.confirm.blank_vote')
              : answers[0]
                  .map((a: string) => choices[Number(a)].title.default)
                  .map((a: string) => `- ${a}`)
                  .join('<br />'),
        }}
      />
    </Text>
  )
}

const ConfirmQuestion = ({
  question,
  answers,
  index,
}: {
  question: IQuestion
  answers: FieldValues
  index: number
}) => {
  return (
    <Text display='flex' flexDirection='column' gap={1}>
      <Trans
        i18nKey='process.spreadsheet.confirm.option'
        components={{
          span: <Text as='span' fontWeight='bold' whiteSpace='nowrap' />,
        }}
        values={{
          answer: question.choices[Number(answers[index])].title.default,
          number: index + 1,
        }}
      />
    </Text>
  )
}
