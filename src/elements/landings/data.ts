interface IDemoData {
orgName: string
mainTitle: string
date: string
endDate: string
elections: string[]
}

export const DemoData: IDemoData = {
orgName: "Test Organization",
mainTitle: "General elections",
date: "2024-05-03 11:30:00",
endDate: "2024-06-20 00:00:00",
elections: [
  "88ef4916f98ba07588b025aa10fa0fb52fef17ac227211f2bd22030800000015",
],
}
