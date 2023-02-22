import { CheckIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';

const ModalSuccess = () => (
  <Flex justifyContent="center" alignItems="center" direction="column" gap={4}>
    <CheckIcon />
    <Text>Created</Text>
  </Flex>
);

export default ModalSuccess;
