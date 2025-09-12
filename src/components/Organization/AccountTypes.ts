import { AccountData, IAccount } from '@vocdoni/sdk'

export type SaasOrganizationData = {
  active: boolean
  address: string
  color: string
  country: string
  createdAt: string
  header: string
  language: string
  meta: Record<string, string>
  parent: string
  size: string
  subdomain: string
  timezone: string
  type: string
  website: string
}

export type OrganizationData = SaasOrganizationData & AccountData

export type CreateOrgParams = Partial<
  Pick<IAccount, 'name' | 'description' | 'avatar' | 'header'> &
    Omit<SaasOrganizationData, 'active' | 'address' | 'createdAt'>
>
