import { Box, BoxProps, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

export type DashboardCardHeaderProps = BoxProps & {
  title: ReactNode
  subtitle?: ReactNode
}

export const DashboardCardHeader = ({ title, subtitle, ...props }: DashboardCardHeaderProps) => (
  <Box mb={4} {...props}>
    <Text fontWeight='bold' fontSize='2xl' mb={1}>
      {title}
    </Text>
    {subtitle && (
      <Text color='texts.subtle' fontSize='sm'>
        {subtitle}
      </Text>
    )}
  </Box>
)
