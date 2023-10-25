import i18n from '~i18n'
import ErrorRows from './ErrorRows'

export default class ErrorCellData extends ErrorRows {
  constructor(rows: number[]) {
    super(rows)
    this.message = i18n.t('error.invalid_cell_data', { rows: this.rows })
    this.name = 'ErrorCellData'
  }
}
