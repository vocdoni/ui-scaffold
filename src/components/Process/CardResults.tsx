import { Box, Card, CardBody, CardHeader, Flex, Text } from '@chakra-ui/react'
import { PublishedElection } from '@vocdoni/sdk'

const ProcessCardResults = ({ election }: { election: PublishedElection }) => {
  const questions = [...election.questions]

  const totals = questions.map((el) => el.choices.reduce((acc, curr) => acc + Number(curr.results), 0))

  return (
    <>
      {election?.electionType.secretUntilTheEnd ? (
        <Text color='branding.purple' textAlign='center' fontWeight='bold'>
          Secret until the end
        </Text>
      ) : (
        <Flex direction='column' gap={4}>
          {questions.map((q: any, idx: number) => (
            <Card variant='results' key={idx}>
              <CardHeader>
                <Text fontWeight='bold' mb={3}>
                  {q.title.default}
                </Text>
              </CardHeader>
              <CardBody>
                {questions[idx].choices.map((c: any, i: number) => (
                  <Box key={i}>
                    <Text>{c.title.default}</Text>
                    <Flex alignItems='center' gap={4}>
                      <Text>
                        Votes: {c.results || 0} ({((Number(c.results) / totals[idx]) * 100 || 0).toFixed(0)}
                        %)
                      </Text>
                      <Box backgroundColor='gray.100' width='200px' height='10px'>
                        <Box
                          w={`${((Number(c.results) / totals[idx]) * 100 || 0).toFixed(0)}%`}
                          bgColor='blue.400'
                          height='100%'
                        />
                      </Box>
                    </Flex>
                  </Box>
                ))}
              </CardBody>
            </Card>
          ))}
        </Flex>
      )}
    </>
  )
}

export default ProcessCardResults
