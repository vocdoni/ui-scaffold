import { Button, Flex, Text } from '@chakra-ui/react';
import { PublishedElection } from '@vocdoni/sdk';
import { Link } from 'react-router-dom';
import { formatDate } from '../../lib/processList/formatDate';
import { getStatusElectionName } from '../../lib/processList/statusElection';

interface Props {
  el: PublishedElection;
}

const ModalProcessInfo = ({ el }: Props) => (
  <Flex
    direction="column"
    justifyContent="center"
    alignItems="center"
    gap={4}
    p={4}
  >
    <Text>{getStatusElectionName(el).toUpperCase()}</Text>
    <Text>Creation date: {formatDate(el.creationTime)}</Text>
    <Text>Start date: {formatDate(el.startDate)}</Text>
    <Text>End date: {formatDate(el.endDate)}</Text>
    <Button alignSelf="center" mt={12}>
      <Link to={`/${el.id}`}>More info</Link>
    </Button>
  </Flex>
);

export default ModalProcessInfo;
