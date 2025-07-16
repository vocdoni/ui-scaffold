import i18n from '~i18n'
import ErrorRows from './ErrorRows'

export default class ErrorWeightType extends ErrorRows {
  constructor(rows: number[]) {
    super(rows)
    this.message = i18n.t('error.invalid_weight_type', { rows: this.rows })
    this.name = 'ErrorWeightType'
  }
}
