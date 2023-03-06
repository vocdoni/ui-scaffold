import {
  ElectionDescription,
  ElectionHeader,
  ElectionProvider,
  ElectionProviderComponentProps,
  ElectionSchedule,
  ElectionStatusBadge,
  ElectionTitle,
  HR,
  QuestionsForm
} from '@vocdoni/react-components'

export const ProcessView = (props: ElectionProviderComponentProps) => (
  <ElectionProvider {...props}>
    <ElectionHeader />
    <ElectionTitle />
    <ElectionSchedule />
    <ElectionStatusBadge />
    <ElectionDescription />
    <HR />
    <QuestionsForm />
  </ElectionProvider>
)
