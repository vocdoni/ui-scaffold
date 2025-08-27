import { read, utils, WorkBook } from 'xlsx'
import i18n from '~i18n'

export enum ErrorType {
  InvalidRowLength,
  InvalidWeight,
  InvalidCellData,
}

export class SpreadsheetManager {
  protected readonly reader
  protected heading: string[]
  protected filedata: string[][]

  public workBook: WorkBook | undefined
  public errors: number[] = []

  constructor(
    public file: File,
    protected headed: boolean = false
  ) {
    this.reader = new FileReader()
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
    if (this.headed && (!this.header || this.header.length === 0)) {
      const e = new Error(i18n.t('error.missing_header', { defaultValue: 'Spreadsheet has no header.' }))
      e.name = 'MissingHeader'
      throw e
    }

    if (!this.data || this.data.length === 0) {
      const e = new Error(i18n.t('error.missing_data', { defaultValue: 'Spreadsheet has no data.' }))
      e.name = 'MissingData'
      throw e
    }
  }

  public get header(): string[] {
    return this.heading
  }

  public get data(): string[][] {
    return this.filedata
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
          if (this.headed) {
            this.heading = this.filedata.splice(0, 1)[0]
          }
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
