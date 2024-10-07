export interface OrgInterface {
  active: boolean
  address: string
  createdAt: string
  name: string
  website: string
  description: string
  size: string
  type: string
  country: string
  timezone: string
  language: string
  logo: string
  header: string
  subdomain: string
  color: string
  communications: boolean
}

export type CreateOrgParams = Partial<Omit<OrgInterface, 'active' | 'address' | 'createdAt'>>
