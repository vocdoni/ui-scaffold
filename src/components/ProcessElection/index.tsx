import { Text } from '@chakra-ui/react';
import {
  ElectionDescription,
  ElectionProvider,
  ElectionTitle,
} from '@vocdoni/react-components';

interface Props {
  id: string;
}

const ProcessElection: React.FC<Props> = ({ id }) => {
  return (
    <>
      <ElectionProvider id={id}>
        <Text mb={12}>Process: {id}</Text>
        <ElectionTitle />
        <ElectionDescription />
      </ElectionProvider>
    </>
  );
};

export default ProcessElection;

// import { Election } from '@vocdoni/react-components';
// interface Props {
//   id: any;
// }

// const ProcessElection: React.FC<Props> = ({ id }) => {
//   return (
//     <>
//       <Election id={id} />
//     </>
//   );
// };

// export default ProcessElection;
