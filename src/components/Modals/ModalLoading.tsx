import { Box, Flex, Spinner, Text } from '@chakra-ui/react';

const ModalLoading = () => (
  <Flex direction="column" justifyContent="center" alignItems="center" gap={12}>
    <Spinner width={20} height={20} />
    <Box>
      <Text textAlign="center">Please sign the transaction </Text>
      <Text textAlign="center">and don't refresh the page</Text>
    </Box>
  </Flex>
);

export default ModalLoading;
