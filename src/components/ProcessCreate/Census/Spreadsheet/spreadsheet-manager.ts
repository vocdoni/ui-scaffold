import { walletFromRow } from '@vocdoni/react-providers'
import { read, utils, WorkBook } from 'xlsx'
import ErrorRowLength from './errors/ErrorRowLength'
import ErrorWeightType from './errors/ErrorWeightType'

export enum ErrorType {
  InvalidRowLength,
  InvalidWeight,
}

const WeightColPosition = 1
const WeightRowPosition = 0

export class SpreadsheetManager {
  protected readonly reader
  protected heading: string[]
  protected filedata: string[][]

  public readonly file
  public workBook: WorkBook | undefined
  public readonly weighted: boolean
  public errors: number[] = []

  constructor(file: File, weighted: boolean = false) {
    this.reader = new FileReader()
    this.file = file
    this.weighted = weighted
    this.heading = []
    this.filedata = [[]]
  }

  public read() {
    return this.load().then(() => this.validateDataIntegrity())
  }

  public static AcceptedTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'text/csv',
    'application/csv',
    'application/x-csv',
    'text/x-comma-separated-values',
    'text/comma-separated-values',
    'application/vnd.oasis.opendocument.spreadsheet',
  ]

  public validateDataIntegrity(): void {
    const errorTypes: ErrorType[] = []

    this.filedata.forEach((row, index) => {
      if (row.length !== this.heading.length) {
        if (!errorTypes.includes(ErrorType.InvalidRowLength)) {
          errorTypes.push(ErrorType.InvalidRowLength)
        }
        this.errors.push(index + 2)
      }

      if (this.weighted) {
        const regex = /^[0-9]+$/
        if (!regex.test(row[WeightRowPosition])) {
          if (!errorTypes.includes(ErrorType.InvalidWeight)) {
            errorTypes.push(ErrorType.InvalidWeight)
          }
          this.errors.push(index + 2)
        }
      }
    })

    // we could return both errors with a custom generic error type (rather than
    // one for each one), but it could bring false-positives, since having an
    // erroneus row length could also trigger the invalid weighted vote
    if (errorTypes.includes(ErrorType.InvalidRowLength)) {
      throw new ErrorRowLength(this.errors)
    }

    if (errorTypes.includes(ErrorType.InvalidWeight)) {
      throw new ErrorWeightType(this.errors)
    }
  }

  public get header(): string[] {
    return !this.weighted ? this.heading : this.heading.slice(WeightColPosition)
  }

  public get data(): string[][] {
    return !this.weighted ? this.filedata : this.filedata.map((row) => row.slice(WeightColPosition))
  }

  public get weights(): string[] {
    return this.filedata.map((row) => row[WeightRowPosition])
  }

  public generateWallets(organization: string): Promise<{ address: string; weight: number | undefined }[]> {
    return Promise.all(
      this.filedata.map(
        (row: string[]): Promise<{ address: string; weight: number | undefined }> =>
          new Promise((resolve, reject) =>
            setTimeout(async () => {
              try {
                const data = this.weighted ? row.slice(WeightColPosition) : row
                const weight = this.weighted ? parseInt(row[WeightRowPosition], 10) : undefined
                const wallet = walletFromRow(organization, data)
                const address = await wallet.getAddress()

                resolve({ address, weight })
              } catch (e) {
                reject(e)
              }
            }, 50)
          )
      )
    )
  }

  private load(): Promise<SpreadsheetManager> {
    return new Promise((resolve, reject): void => {
      this.reader.onload = (event) => {
        try {
          this.workBook = read(this.reader.result, {
            type: 'binary',
            codepage: 65001,
          })
          this.filedata = this.getSheetsData(this.workBook)
          this.heading = this.filedata.splice(0, 1)[0]
          resolve(this)
        } catch (error) {
          reject(error)
        }
      }
      this.reader.readAsBinaryString(this.file)
    })
  }

  private getSheetsData(xlsFile: WorkBook) {
    const firstSheetName = xlsFile.SheetNames[0]
    const worksheet = xlsFile.Sheets[firstSheetName]
    const data: string[][] = utils.sheet_to_json(worksheet, { header: 1, raw: false })
    const filtered = data.filter((row) => row.length > 0)

    return filtered
  }
}
