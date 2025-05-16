import { AccordionIcon, AccordionIconProps, useAccordionItemState } from '@chakra-ui/react'

const InvertedAccordionIcon = (props: AccordionIconProps) => {
  const { isOpen } = useAccordionItemState()

  return (
    <AccordionIcon
      transform={isOpen ? 'rotate(0deg)' : 'rotate(180deg)'}
      transition='transform 0.2s ease-in-out'
      {...props}
    />
  )
}

export default InvertedAccordionIcon
