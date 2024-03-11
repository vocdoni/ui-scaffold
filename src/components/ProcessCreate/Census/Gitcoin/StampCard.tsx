import { Box, Checkbox, Text, Card, CardHeader } from '@chakra-ui/react'
import { StampIcon, StampId } from '~components/ProcessCreate/Census/Gitcoin/StampIcon'
import { Controller, useFormContext } from 'react-hook-form'
import { GitcoinStampToken } from '~components/ProcessCreate/Census/Gitcoin/index'
import { CensusGitcoinValues } from '~components/ProcessCreate/StepForm/CensusGitcoin'

interface IStampCardProps {
  token: GitcoinStampToken
}

export const StampCard: React.FC<IStampCardProps> = ({ token }) => {
  const stampId = token.symbol
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
            flex='0 0 30%'
            variant='radiobox'
            onChange={(e) => switchOnChange(e.target.checked as boolean)}
            isChecked={field.value.isChecked}
          >
            <Box>
              <StampInnerBox name={token.name} tokenId={token.externalID} />
            </Box>
          </Checkbox>
        )
      }}
    />
  )
}

type StampInnerBoxProps = { name: string; tokenId: StampId }

const StampInnerBox: React.FC<StampInnerBoxProps> = ({ name, tokenId }) => {
  const stampTitle = name.replace('Gitcoin Passport Score', '')
  return (
    <>
      <StampIcon stampId={tokenId} />
      <Text>{stampTitle}</Text>
    </>
  )
}

export const StampPreviewCard: React.FC<StampInnerBoxProps> = (props) => {
  return (
    // <Card borderRadius={0} w='full' my={5} boxShadow='var(--box-shadow)'>
    <Card
      borderRadius={0}
      display={'flex'}
      flexDirection={'row'}
      w='full'
      p={4}
      boxShadow='var(--box-shadow)'
      fontWeight={'bold'}
      fontSize={'sm'}
      alignSelf={'start'}
      alignItems={'start'}
      minW={'min-content'}
    >
      <StampInnerBox {...props} />
    </Card>
  )
}
