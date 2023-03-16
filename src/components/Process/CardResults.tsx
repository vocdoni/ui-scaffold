import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Circle,
  Flex,
  Text,
} from '@chakra-ui/react'
import { ElectionStatus, PublishedElection } from '@vocdoni/sdk'

const ProcessCardResults = ({ election }: { election: PublishedElection }) => {
  const questions = [...election.questions]

  const colors = questions.map((q) => q.choices.map(() => getRandomRGB()))

  const sortedQuestions = questions.map((q, idx) => ({
    ...q,
    choices: q.choices.sort((a, b) => Number(b.results) - Number(a.results)),
  }))

  const totals = sortedQuestions.map((el) =>
    el.choices.reduce((acc, curr) => acc + Number(curr.results), 0)
  )

  const bars = sortedQuestions.map((el, idx) => (
    <Box
      key={idx}
      borderRadius={8}
      overflow='hidden'
      width='300px'
      height='20px'
      border='1px solid black'
      mb={4}
    >
      {el.choices.map((part, i) => (
        <Box
          key={i}
          width={`${(Number(part.results) / totals[idx]) * 100}%`}
          height='100%'
          display='inline-block'
          bgColor={colors[idx][i]}
        ></Box>
      ))}
    </Box>
  ))

  return (
    <>
      {election?.electionType.secretUntilTheEnd &&
      election.status === ElectionStatus.ENDED &&
      election.status === ElectionStatus.PAUSED ? (
        <Text color='branding.purple' textAlign='center' fontWeight='bold'>
          Secret until the end
        </Text>
      ) : (
        <Flex direction='column' gap={4}>
          {sortedQuestions.map((q: any, idx: number) => (
            <Card variant='results' key={idx}>
              <CardHeader>
                <Text fontWeight='bold' mb={3}>
                  {q.title.default}
                </Text>
                {bars[idx]}
              </CardHeader>

              {sortedQuestions[idx].choices.map((c: any, i: number) => (
                <CardBody key={i}>
                  <Circle bgColor={colors[idx][i]} size={3} />
                  <Box>
                    <Text>{c.title.default}</Text>
                    <Text>
                      Votes: {c.results || 0} (
                      {((Number(c.results) / totals[idx]) * 100 || 0).toFixed(
                        0
                      )}
                      %)
                    </Text>
                  </Box>
                </CardBody>
              ))}
            </Card>
          ))}
        </Flex>
      )}
    </>
  )
}
function getRandomRGB() {
  var r = Math.floor(Math.random() * 226 + 30)
  var g = Math.floor(Math.random() * 226 + 30)
  var b = Math.floor(Math.random() * 226 + 30)
  return 'rgb(' + r + ', ' + g + ', ' + b + ')'
}

export default ProcessCardResults
