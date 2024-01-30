import { CensusSpreadsheetManager } from './CensusSpreadsheetManager'
import ErrorCellData from './errors/ErrorCellData'
import { ErrorType } from './SpreadsheetManager'

export class EmailAddressesSpreadsheetManager extends CensusSpreadsheetManager {
  constructor(file: File, weighted: boolean = false) {
    super(file, false, weighted)
  }

  public validateDataIntegrity(): void {
    super.validateDataIntegrity()
    const errorTypes: ErrorType[] = []

    this.filedata.forEach(([first, second], index) => {
      const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
      const address = this.weighted ? second : first
      if (!regex.test(address)) {
        if (!errorTypes.includes(ErrorType.InvalidCellData)) {
          errorTypes.push(ErrorType.InvalidCellData)
        }
        this.errors.push(index + 1)
      }
    })

    if (errorTypes.includes(ErrorType.InvalidCellData)) {
      throw new ErrorCellData(this.errors)
    }
  }
}
