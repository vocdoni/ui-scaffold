import { Box, Checkbox, Text } from '@chakra-ui/react'
import { StampIcon, StampId } from '~components/ProcessCreate/Census/Gitcoin/StampIcon'
import { Controller, useFormContext } from 'react-hook-form'
import { GitcoinStampToken } from '~components/ProcessCreate/Census/Gitcoin/index'
import { CensusGitcoinValues } from '~components/ProcessCreate/StepForm/CensusGitcoin'

interface IStampCardProps {
  name: string
  token: GitcoinStampToken
}

export const StampCard: React.FC<IStampCardProps> = ({ name, token }) => {
  const stampId = token.symbol
  const stampTitle = name.replace('Gitcoin Passport Score', '')
  const { control, setValue } = useFormContext<CensusGitcoinValues>()

  const switchOnChange = (value: boolean) => {
    setValue(`stamps.${stampId}`, { ...token, isChecked: value })
  }

  return (
    <Controller
      name={`stamps.${stampId}`}
      defaultValue={{ ...token, isChecked: false }}
      control={control}
      render={({ field }) => {
        return (
          <Checkbox
            isChecked={field.value.isChecked}
            flex='0 0 30%'
            variant='radiobox'
            onChange={(e) => switchOnChange(e.target.checked as boolean)}
          >
            <Box>
              <StampIcon stampId={token.externalID} />
              <Text>{stampTitle}</Text>
            </Box>
          </Checkbox>
        )
      }}
    />
  )
}
