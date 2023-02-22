import { InfoIcon } from '@chakra-ui/icons';
import {
  Box,
  ButtonGroup,
  HStack,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useClientContext } from '@vocdoni/react-components';
import { ElectionStatus, PublishedElection } from '@vocdoni/sdk';
import { useContext, useState } from 'react';
import { FaPause, FaPlay, FaStop } from 'react-icons/fa';
import { MODAL_TYPE } from '../../constants/modalType';
import { UpdatedBalanceContext } from '../../lib/contexts/UpdatedBalanceContext';
import { getButtonsDisabled } from '../../lib/processList/buttonsDisabled';
import ModalWrapper from '../Modals/ModalWrapper';

interface Props {
  el: PublishedElection;
  setElectionsList: React.Dispatch<React.SetStateAction<PublishedElection[]>>;
}

const ProcessListActionButtons = ({ el, setElectionsList }: Props) => {
  const { client } = useClientContext();

  const { updateBalance } = useContext(UpdatedBalanceContext);

  const [modalType, setModalType] = useState(MODAL_TYPE.CLOSED);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAction = async (action: string) => {
    setModalType(MODAL_TYPE.LOADING);
    onOpen();
    try {
      if (action === ElectionStatus.READY) await client.continueElection(el.id);
      if (action === ElectionStatus.PAUSED) await client.pauseElection(el.id);
      if (action === ElectionStatus.CANCELED)
        await client.cancelElection(el.id);
    } catch (err) {
      console.log(err);
    } finally {
      updateBalance();
      setElectionsList([]);
      onClose();
    }
  };

  return (
    <HStack spacing={4} justifyContent="end" flex="0 0 160px">
      <ModalWrapper
        isOpen={isOpen}
        onClose={onClose}
        type={modalType}
        el={el}
      />
      <Box position="relative">
        <ButtonGroup size="sm" isAttached variant="outline" position="relative">
          <>
            <IconButton
              aria-label="Search database"
              icon={<FaPlay />}
              onClick={() => handleAction(ElectionStatus.READY)}
              isDisabled={getButtonsDisabled(el, ElectionStatus.READY)}
            />
            <IconButton
              aria-label="Search database"
              icon={<FaPause />}
              onClick={() => handleAction(ElectionStatus.PAUSED)}
              isDisabled={getButtonsDisabled(el, ElectionStatus.PAUSED)}
            />
            <IconButton
              aria-label="Search database"
              icon={<FaStop />}
              onClick={() => handleAction(ElectionStatus.CANCELED)}
              isDisabled={getButtonsDisabled(el, ElectionStatus.CANCELED)}
            />
          </>
        </ButtonGroup>
      </Box>

      <InfoIcon
        boxSize={6}
        cursor="pointer"
        onClick={() => {
          setModalType(MODAL_TYPE.INFO);
          onOpen();
        }}
      />
    </HStack>
  );
};

export default ProcessListActionButtons;
