import ErrorRows from './ErrorRows';

export default class ErrorRowLength extends ErrorRows {
  constructor(rows: number[]) {
    super(rows);
    this.message = 'error.invalid_row_length, rows: ' + this.rows;
    this.name = 'ErrorRowLength';
  }
}
