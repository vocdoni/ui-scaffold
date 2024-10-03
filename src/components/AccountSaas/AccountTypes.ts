import { AccountData, IAccount } from '@vocdoni/sdk'

export type SaasOrganizationData = {
  active: boolean
  address: string
  createdAt: string
  website: string
  size: string
  type: string
  country: string
  timezone: string
  language: string
  header: string
  subdomain: string
  color: string
  communications: boolean
}

export type OrganizationData = SaasOrganizationData & AccountData

export type CreateOrgParams = Partial<
  Pick<IAccount, 'name' | 'description' | 'logo'> & Omit<SaasOrganizationData, 'active' | 'address' | 'createdAt'>
>
