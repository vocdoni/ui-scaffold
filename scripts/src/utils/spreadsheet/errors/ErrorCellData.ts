import ErrorRows from './ErrorRows'

export default class ErrorCellData extends ErrorRows {
  constructor(rows: number[]) {
    super(rows)
    this.message = 'error.invalid_cell_data: ' + this.rows;
    this.name = 'ErrorCellData'
  }
}
