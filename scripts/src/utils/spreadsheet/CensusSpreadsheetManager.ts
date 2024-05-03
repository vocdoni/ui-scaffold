import { VocdoniSDKClient } from '@vocdoni/sdk';
import ErrorRowLength from './errors/ErrorRowLength';
import ErrorWeightType from './errors/ErrorWeightType';
import { ErrorType, SpreadsheetManager } from './SpreadsheetManager';
import { Wallet } from '@ethersproject/wallet';
import latinize from './latinize';

const WeightColPosition = 1;

export class CensusSpreadsheetManager extends SpreadsheetManager {
  public weighted: boolean;

  constructor(file: string, headed: boolean = true, weighted: boolean = false) {
    super(file, headed);
    this.weighted = weighted;
  }

  public loadFromStorage(manager: string | InstanceType<typeof CensusSpreadsheetManager>) {
    let mi = typeof manager === 'string' ? JSON.parse(manager) : manager;

    this.heading = mi.heading;
    this.filedata = mi.filedata;
    this.file = mi.file;
    this.headed = mi.headed;
    this.weighted = mi.weighted;
  }

  public validateDataIntegrity(): void {
    const errorTypes: ErrorType[] = [];

    this.filedata.forEach((row, index) => {
      // actual index
      const ai = this.headed ? index + 2 : index + 1;
      // check for different column size
      if (this.heading.length && row.length !== this.heading.length) {
        if (!errorTypes.includes(ErrorType.InvalidRowLength)) {
          errorTypes.push(ErrorType.InvalidRowLength);
        }
        this.errors.push(ai);
      }

      // check weight column
      if (this.weighted) {
        const regex = /^[0-9]+$/;
        if (!regex.test(row[WeightColPosition - 1])) {
          if (!errorTypes.includes(ErrorType.InvalidWeight)) {
            errorTypes.push(ErrorType.InvalidWeight);
          }
          this.errors.push(ai);
        }
      }
    });

    // we could return both errors with a custom generic error type (rather than
    // one for each one), but it could bring false-positives, since having an
    // erroneus row length could also trigger the invalid weighted vote
    if (errorTypes.includes(ErrorType.InvalidRowLength)) {
      throw new ErrorRowLength(this.errors);
    }

    if (errorTypes.includes(ErrorType.InvalidWeight)) {
      throw new ErrorWeightType(this.errors);
    }
  }

  public get header(): string[] {
    return !this.weighted ? this.heading : this.heading.slice(WeightColPosition);
  }

  public get data(): string[][] {
    return !this.weighted ? this.filedata : this.filedata.map((row) => row.slice(WeightColPosition));
  }

  public get weights(): string[] {
    return this.filedata.map((row) => row[WeightColPosition - 1]);
  }

  public generateWallets(salt: string): Promise<{ address: string; weight: number | undefined; wallet: Wallet }[]> {
    return Promise.all(
      this.filedata.map(
        (row: string[]): Promise<{ address: string; weight: number | undefined; wallet: Wallet }> =>
          new Promise((resolve, reject) =>
            setTimeout(async () => {
              try {
                const data = this.weighted ? row.slice(WeightColPosition) : row;
                const weight = this.weighted ? parseInt(row[WeightColPosition - 1], 10) : undefined;
                const wallet = walletFromRow(salt, data);
                const address = await wallet.getAddress();

                resolve({ address, weight, wallet });
              } catch (e) {
                reject(e);
              }
            }, 50)
          )
      )
    );
  }
}

/**
 *
 * FOLLOWING FUNCTIONS ARE COPIED FROM react-providers/utils.ts
 *
 */
export const walletFromRow = (salt: string, row: string[]) => {
  const normalized = row.map(normalizeText);
  normalized.push(salt);
  return VocdoniSDKClient.generateWalletFromData(normalized);
};

export const normalizeText = (text?: string): string => {
  if (!text) return '';

  const result = text
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[\.·:]/g, '.')
    .replace(/[`´]/g, "'")
    .normalize()
    .toLowerCase();

  return latinize(result);
};
