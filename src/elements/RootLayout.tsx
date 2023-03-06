import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import UpdateBalanceProvider from '../components/Contexts/UpdateBalanceProvider';
import Footer from '../components/Layouts/Footer';
import Navbar from '../components/Layouts/Navbar';

const RootLayout = () => {
  return (
    <UpdateBalanceProvider>
      <Flex
        paddingX={4}
        flexDirection="column"
        minHeight="100vh"
        maxWidth="1250px"
        margin="0 auto"
      >
        <Navbar />
        <Box mb={8}>
          <Outlet />
        </Box>
        <Footer />
      </Flex>
    </UpdateBalanceProvider>
  );
};

export default RootLayout;
