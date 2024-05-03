import fs from 'fs'
import path from 'path'
import chalk from 'chalk'

export const copyFile = (source: string, destination: string) => {
  source = path.resolve(source)
  destination = path.resolve(destination)

  // assert source exists
  if (!fs.existsSync(source)) {
    console.error(chalk.red(`Source file ${source} does not exist`))
    return
  }

  fs.copyFile(source, destination, (err) => {
    if (err) {
      console.error(chalk.red(`Error occurred while copying file ${source} `), err)
    } else {
      console.log(chalk.green(`Done ✅ File ${source} copied successfully`))
    }
  })
}
