import { ElectionStatus, PublishedElection } from '@vocdoni/sdk';

export const getButtonsDisabled = (
  el: PublishedElection,
  electionStatus: ElectionStatus
) => {
  const now = new Date();

  const isStarted = now.getTime() > el.startDate.getTime();

  const allDisabled =
    !isStarted ||
    el.status === ElectionStatus.RESULTS ||
    el.status === ElectionStatus.CANCELED ||
    el.status === ElectionStatus.ENDED;

  const readyDisabled = el.status === ElectionStatus.READY;
  const pauseDisabled = el.status === ElectionStatus.PAUSED;

  if (electionStatus === ElectionStatus.READY)
    return allDisabled || readyDisabled;

  if (electionStatus === ElectionStatus.PAUSED)
    return allDisabled || pauseDisabled;

  if (electionStatus === ElectionStatus.CANCELED) return allDisabled;
};
