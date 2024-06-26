import { Box, Card, Checkbox, Text } from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'
import { StampIcon } from '~components/Process/Census/StampIcon'
import { CensusGitcoinValues } from '~components/ProcessCreate/StepForm/CensusGitcoin'
import { GitcoinStampToken } from '.'

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
            sx={{
              '&': {
                _checked: {
                  outline: '1px solid',
                  borderColor: 'process.gitcoin_card_checked',
                },
              },
              '& div:first-of-type': {
                mb: 0,
                fontWeight: 'normal',
              },

              '& > span:first-of-type': {
                display: 'none',

                '& > div': {
                  mb: 0,
                },
                _checked: {
                  display: 'block',
                },
              },
            }}
          >
            <Box>
              <StampInnerBox name={token.name} iconURI={token.iconURI} />
            </Box>
          </Checkbox>
        )
      }}
    />
  )
}

type StampInnerBoxProps = { name: string; iconURI: string | undefined }

const StampInnerBox: React.FC<StampInnerBoxProps> = ({ name, iconURI }) => {
  const stampTitle = name.replace('Gitcoin Passport Score', '')
  return (
    <>
      <StampIcon iconURI={iconURI} alt={stampTitle} />
      <Text wordBreak='normal' ml={2}>
        {stampTitle}
      </Text>
    </>
  )
}

export const StampPreviewCard: React.FC<StampInnerBoxProps> = (props) => {
  return (
    <Card
      borderRadius={0}
      display={'flex'}
      flexDirection={'row'}
      w='full'
      p={{ base: 2, lg: 4 }}
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
