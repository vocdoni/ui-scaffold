import { Box, Card, CardBody, Flex, Img, Text } from '@chakra-ui/react'
import { Trans } from 'react-i18next'
import empty from '/assets/illustrations/2.png'

export const NoResultsFiltering = () => (
  <Card variant='no-elections' minH='100%' maxW='650' m='80px auto'>
    <CardBody>
      <Flex justifyContent={'center'}>
        <Img src={empty} />
      </Flex>
      <Box mt='50px' textAlign='center'>
        <Text as='h3' fontSize='md' fontWeight='bold'>
          <Trans i18nKey='no_results_filtering'>Your current search filter returns no results</Trans>
        </Text>
      </Box>
    </CardBody>
  </Card>
)
