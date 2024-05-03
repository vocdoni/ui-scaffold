import * as fs from 'fs';
import { read, utils, WorkBook } from 'xlsx';

export enum ErrorType {
  InvalidRowLength,
  InvalidWeight,
  InvalidCellData,
}

export class SpreadsheetManager {
  protected heading: string[];
  protected filedata: string[][];

  public workBook: WorkBook | undefined;
  public errors: number[] = [];

  constructor(public file: string, protected headed: boolean = false) {
    this.heading = [];
    this.filedata = [[]];
  }

  public read() {
    return this.load().then(() => this.validateDataIntegrity());
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
  ];

  public validateDataIntegrity(): void {}

  public get header(): string[] {
    return this.heading;
  }

  public get data(): string[][] {
    return this.filedata;
  }

  private load(): Promise<SpreadsheetManager> {
    return new Promise((resolve, reject): void => {
      try {
        const fileContent = fs.readFileSync(this.file, 'binary');
        this.workBook = read(fileContent, { type: 'binary', codepage: 65001 });
        this.filedata = this.getSheetsData(this.workBook);
        if (this.headed) {
          this.heading = this.filedata.splice(0, 1)[0];
        }
        resolve(this);
      } catch (error) {
        reject(error);
      }
    });
  }

  private getSheetsData(xlsFile: WorkBook) {
    const firstSheetName = xlsFile.SheetNames[0];
    const worksheet = xlsFile.Sheets[firstSheetName];
    const data: string[][] = utils.sheet_to_json(worksheet, { header: 1, raw: false });
    const filtered = data.filter((row) => row.length > 0);

    return filtered;
  }
}
