export interface OrgInterface {
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
}

export type CreateOrgParams = Partial<OrgInterface>
