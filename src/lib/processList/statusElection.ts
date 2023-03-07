import { ElectionStatus, PublishedElection } from '@vocdoni/sdk'

export const getStatusElectionName = (el: PublishedElection) => {
  const now = new Date()

  if (el.status === ElectionStatus.READY) {
    if (now.getTime() < el.startDate.getTime()) return 'ready'
    else return 'on going'
  }
  if (el.status === ElectionStatus.PAUSED) return 'paused'
  if (el.status === ElectionStatus.CANCELED) return 'canceled'
  if (el.status === ElectionStatus.ENDED) return 'ended'
  if (el.status === ElectionStatus.RESULTS) return 'results'

  return 'undefined'
}
