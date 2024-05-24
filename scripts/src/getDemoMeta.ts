import { DEMO_META_DEST, LOGO_DEST } from './utils/constants'
import { copyFile } from './utils/utils'
import fs from 'fs'
import mustache from 'mustache'
import { Account } from '@vocdoni/sdk'

export const DemoMeta = {
  logo: 'demo.png',
  orgName: 'Test Organization',
  date: '2024-05-03 11:30:00',
  endDate: '2024-06-20 00:00:00',
  mainTitle: 'General elections',
}

export const AccountInfo = new Account({
  name: DemoMeta.orgName,
  // avatar: DemoMeta.orgAvatar, // atm only url avatar supported
})

export const createDemoMeta = (elections: string[]) => {
  // copy DemoInterface.logo to LOGO_DEST folder
  copyFile(DemoMeta.logo, LOGO_DEST)
  // Load moustache template
  const template = fs.readFileSync('src/templates/demoMeta.mustache').toString()
  // Render template
  const renderedTemplate = mustache.render(template, { ...DemoMeta, elections })
  // Save rendered template to file
  fs.writeFileSync(DEMO_META_DEST, renderedTemplate)
}
