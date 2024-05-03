interface IDemoData {
orgName: string
mainTitle: string
date: string
endate: string
elections: string[]
}

export const DemoData: IDemoData = {
orgName: "Test Organization",
mainTitle: "General elections",
date: "2024-05-03 11:30:00",
endate: "",
elections: [
  "88ef4916f98ba07588b025aa10fa0fb52fef17ac227211f2bd2202000000000d",
  "88ef4916f98ba07588b025aa10fa0fb52fef17ac227211f2bd2202000000000e",
  "88ef4916f98ba07588b025aa10fa0fb52fef17ac227211f2bd2202080000000f",
],
}
