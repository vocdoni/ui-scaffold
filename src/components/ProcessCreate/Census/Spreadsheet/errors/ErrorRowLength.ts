import i18n from '@i18n'
import ErrorRows from './ErrorRows'

export default class ErrorRowLength extends ErrorRows {
  constructor(rows: number[]) {
    super(rows)
    this.message = i18n.t('error.invalid_row_length', { rows: this.rows })
    this.name = 'ErrorRowLength'
  }
}
