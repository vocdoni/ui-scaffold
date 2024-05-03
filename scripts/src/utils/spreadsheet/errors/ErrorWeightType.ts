import ErrorRows from './ErrorRows';

export default class ErrorWeightType extends ErrorRows {
  constructor(rows: number[]) {
    super(rows);
    this.message = 'error.invalid_weight_type, rows: ' + this.rows;
    this.name = 'ErrorWeightType';
  }
}
