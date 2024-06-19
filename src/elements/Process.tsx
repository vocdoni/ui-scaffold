import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ElectionProvider, OrganizationProvider } from '@vocdoni/react-providers'
import {
  AccountData,
  ElectionResultsTypeNames,
  ElectionStatusReady,
  PlainCensus,
  PublishedElection,
} from '@vocdoni/sdk'
import { useLoaderData } from 'react-router-dom'
import { ProcessView } from '~components/Process/View'
import { useEffect, useState } from 'react'
import { StepsFormValues } from '~components/ProcessCreate/Steps/use-steps'
import { Loading } from '~src/router/SuspenseLoader'
import { useTranslation } from 'react-i18next'

const Process = () => {
  const election = useLoaderData() as PublishedElection

  return (
    <OrganizationProvider id={election.organizationId}>
      <ElectionProvider election={election} ConnectButton={ConnectButton} fetchCensus autoUpdate>
        <ProcessView />
      </ElectionProvider>
    </OrganizationProvider>
  )
}

export default Process

/**
 * This hook is used to show a preview of a process during the creation process.
 */
export const ProcessPreview = () => {
  const { t } = useTranslation()
  // const organization = useLoaderData() as AccountData
  const [election, setElection] = useState<PublishedElection | null>(null)
  const [organization, setOrganization] = useState<AccountData | null>(null)

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.data.previewData) {
        setElection(null)
        // Used to unmount de provider in order to update the election properly on a live preview
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const organization = event.data.previewData.account as AccountData
        setOrganization(organization)

        const formData = event.data.previewData.formData as StepsFormValues
        const date = new Date()
        const election = new PublishedElection({
          id: 'dummy',
          census: new PlainCensus(),
          chainId: '',
          creationTime: date.toString(),
          startDate: formData.electionType.autoStart ? date.toString() : new Date(formData.startDate).getTime(),
          endDate: formData.endDate ? new Date(formData.endDate) : date.setMonth(date.getMonth() + 1),
          finalResults: false,
          fromArchive: false,
          manuallyEnded: false,
          metadataURL: '',
          raw: {},
          voteType: {
            uniqueChoices: true,
          },
          electionType: {
            secretUntilTheEnd: false,
          },
          results: [['0', '0']],
          resultsType: { name: ElectionResultsTypeNames.SINGLE_CHOICE_MULTIQUESTION, properties: {} },
          title: formData.title ?? t('process_create.customization.preview.title'),
          description: formData.description ?? t('process_create.customization.preview.description'),
          voteCount: 0,
          status: ElectionStatusReady.READY,
          organizationId: organization.address,
          header: formData.header ?? '',
          streamUri: formData.streamUri ?? '',
          questions: [
            {
              choices: [
                {
                  title: { default: t('process_create.customization.preview.question_option1') },
                  value: 0,
                  results: '0',
                },
                {
                  title: { default: t('process_create.customization.preview.question_option2') },
                  value: 1,
                  results: '0',
                },
              ],
              description: { default: t('process_create.customization.preview.question_description') },
              title: { default: t('process_create.customization.preview.question_title') },
            },
          ],
        })
        setElection(election)
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  if (!election || !organization) return <Loading />

  // Used to unmount de provider in order to update the election properly on a live preview
  return <PreviewProviders election={election} organization={organization} />
}

const PreviewProviders = ({ election, organization }: { election: PublishedElection; organization: AccountData }) => {
  return (
    <OrganizationProvider organization={organization}>
      <ElectionProvider election={election} ConnectButton={ConnectButton}>
        <ProcessView />
      </ElectionProvider>
    </OrganizationProvider>
  )
}
