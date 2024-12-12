import { useTranslation } from 'react-i18next'
import { CensusType, CensusTypeToken } from '~components/Process/Census/CensusType'
import { TabsPage } from '~components/ProcessCreate/Steps/TabsPage'
import { useCensusTypes } from '../Census/TypeSelector'
import { useUnimplementedCensusTypes } from '../Census/UnimplementedTypeSelector'
import { StepsFormValues, useProcessCreationSteps } from './use-steps'

export interface CensusValues {
  censusType: CensusType | null
}

export const Census = () => {
  const { t } = useTranslation()

  const { form, setForm } = useProcessCreationSteps()
  const definedCensusTypes = useCensusTypes()
  const unimCensusTypes = useUnimplementedCensusTypes()
  const { censusType } = form

  return (
    <TabsPage
      definedList={definedCensusTypes}
      unimplementedList={unimCensusTypes}
      onTabChange={(index: number) => {
        const nform: StepsFormValues = { ...form, censusType: definedCensusTypes.defined[index] }
        // ensure maxCensusSize is only set on token-based censuses
        // all other cases are handled automatically via the SDK
        if (definedCensusTypes.defined[index] !== CensusTypeToken && 'maxCensusSize' in nform) {
          delete nform?.maxCensusSize
        }

        setForm(nform)
      }}
      title={t('census.title')}
      description={t('census.description')}
      selected={censusType}
    />
  )
}
