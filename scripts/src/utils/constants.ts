export const LOGO_DEST = '../public/default/assets/demo.png'
export const DEMO_META_DEST = '../src/elements/landings/data.ts'
export const ELECTION_META = {
  generated: 'script',
  census: {
    type: 'spreadsheet',
    fields: ['DNI', 'Data de Naixement'], //TODO: get from spreadsheet
    specs: {
      'Data de Naixement': {
        value: '^[0-9]{2}/[0-9]{2}/[0-9]{4}$',
        message: "Ha d'estar en format dd/mm/aaaa",
      },
    },
  },
}
