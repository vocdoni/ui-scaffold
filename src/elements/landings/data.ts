interface IDemoData {
  orgName: string
  mainTitle: string
  date: string
  elections: string[]
}

export const DemoData: IDemoData = {
  orgName: 'demo',
  mainTitle: 'Main title',
  date: '2023',
  elections: [
    '0x88ef4916f98bd8fcfaa76192aa69cceddaec554b1d82b0166dc9020000000002',
    '0x88ef4916f98bd8fcfaa76192aa69cceddaec554b1d82b0166dc9020000000001',
    '0x88ef4916f98bd8fcfaa76192aa69cceddaec554b1d82b0166dc9020000000002',
    '0x88ef4916f98bd8fcfaa76192aa69cceddaec554b1d82b0166dc9020000000001',
  ],
}
