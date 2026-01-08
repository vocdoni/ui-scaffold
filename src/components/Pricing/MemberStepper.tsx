import { Flex, IconButton, Text, useControllableState } from '@chakra-ui/react'
import React from 'react'
import { LuMinus, LuPlus } from 'react-icons/lu'

type MemberStepperProps = {
  min: number
  max: number
  step?: number
  defaultValue?: number
  value?: number
  onChange?: (value: number) => void
  label?: (count: number) => React.ReactNode
}

export const MemberStepper = ({
  min,
  max,
  step = 500,
  defaultValue,
  value: valueProp,
  onChange: onChangeProp,
  label,
}: MemberStepperProps) => {
  const [value, setValue] = useControllableState({
    defaultValue: defaultValue || min,
    value: valueProp,
    onChange: onChangeProp,
  })

  const increment = () => {
    const next = Math.min(value + step, max)
    setValue(next)
  }

  const decrement = () => {
    const next = Math.max(value - step, min)
    setValue(next)
  }

  return (
    <Flex
      as='span'
      display='inline-flex'
      alignItems='center'
      justifyContent='space-between'
      onClick={(e) => e.stopPropagation() /* Prevent card click */}
      bg='transparent'
      border='1px solid'
      borderColor='gray.200'
      borderRadius='full'
      h='32px'
      px={1}
      maxW='fit-content'
    >
      <IconButton
        aria-label='Decrease member count'
        icon={<LuMinus size={14} />}
        onClick={decrement}
        isDisabled={value <= min}
        size='xs'
        minW='24px'
        h='24px'
        isRound
        colorScheme='gray'
        bg='gray.100'
        _hover={{ bg: 'gray.200', color: 'black' }}
        _disabled={{ opacity: 0.3, cursor: 'not-allowed', bg: 'gray.50' }}
        color='gray.800'
      />

      <Text fontSize='sm' textAlign='center' mx={2} whiteSpace='nowrap'>
        {label ? label(value) : value}
      </Text>

      <IconButton
        aria-label='Increase member count'
        icon={<LuPlus size={14} />}
        onClick={increment}
        isDisabled={value >= max}
        size='xs'
        minW='24px'
        h='24px'
        isRound
        colorScheme='gray'
        bg='gray.100'
        _hover={{ bg: 'gray.200', color: 'black' }}
        _disabled={{ opacity: 0.3, cursor: 'not-allowed', bg: 'gray.50' }}
        color='gray.800'
      />
    </Flex>
  )
}
