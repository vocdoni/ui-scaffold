import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import ProcessElection from '../components/ProcessElection';

const Process = () => {
  let id = useLoaderData();

  if (typeof id !== 'string') return null;

  return <ProcessElection id={id} />;
};

export const getProcessInfo = ({
  params: { id },
}: LoaderFunctionArgs): string => id!;

export default Process;
