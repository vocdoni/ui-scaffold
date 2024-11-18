import { Button, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import Wrapper from '~components/Layout/Wrapper'

const StartNow = () => {
  const { t } = useTranslation()

  return (
    <Wrapper
      as='section'
      display='flex'
      flexDirection='column'
      justifyContent={'center'}
      alignItems={'center'}
      gap={4}
      py={10}
      bgColor='home.start_now.bg_light'
      color={'home.start_now.color_light'}
      _dark={{ bgColor: 'home.start_now.bg_dark', color: 'home.start_now.color_dark' }}
    >
      <Text fontWeight='bold' fontSize={'2xl'}>
        {t('', { defaultValue: 'Ready to revolutionize your voting process' })}
      </Text>
      <Text mb={4}>
        {t('', { defaultValue: 'Join thousands of organizations making better decisions with VotingPlatform.' })}
      </Text>
      <Button _dark={{ bgColor: 'home.start_now.btn_bg_dark' }}> {t('', { defaultValue: 'Get Started Now' })}</Button>
    </Wrapper>
  )
}

export default StartNow
