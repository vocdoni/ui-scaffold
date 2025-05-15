import { AccordionIcon, useAccordionItemState } from '@chakra-ui/react'

const InvertedAccordionIcon = () => {
  const { isOpen } = useAccordionItemState()

  return (
    <AccordionIcon transform={isOpen ? 'rotate(0deg)' : 'rotate(180deg)'} transition='transform 0.2s ease-in-out' />
  )
}

export default InvertedAccordionIcon
