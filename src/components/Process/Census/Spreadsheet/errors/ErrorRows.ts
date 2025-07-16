export default class ErrorRows extends Error {
  // stores the rows as they're received (array of numbers)
  public rows: number[] | string[] = []

  constructor(rows: number[]) {
    super()
    this.name = 'ErrorRows'
    this.rows = rows.map((n) => n.toString())
  }
}
