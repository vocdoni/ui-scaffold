import i18n from '@i18n'

export default class ErrorWeightType extends Error {
  // stores the rows as they're received (array of numbers)
  public rows: number[] = []

  constructor(rows: number[]) {
    super(i18n.t('error.invalid_weight_type', { rows: rows.map((n) => n.toString()) }))
    this.name = 'ErrorWeightType'
    this.rows = rows
  }
}
