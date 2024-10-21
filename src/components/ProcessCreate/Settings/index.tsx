import Advanced from './Advanced'
import Calendar from './Calendar'

const CreateProcessSettings = () => (
  <>
    <Calendar />
    {!import.meta.env.SAAS_URL && <Advanced />}
  </>
)

export default CreateProcessSettings
