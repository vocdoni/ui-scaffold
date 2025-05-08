import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, To } from 'react-router-dom'

export type NavigationFunctionParams = To | number

export type AuthOutletContextType = {
  setTitle: React.Dispatch<React.SetStateAction<string>>
  setSubtitle: React.Dispatch<React.SetStateAction<string>>
}

export const useTestimonials = () => {
  const { t } = useTranslation()

  const testimonials = [
    {
      image: '/assets/testimonials/ceec.webp',
      text: t('testimonials.ceec.text', {
        defaultValue:
          'We chose Vocdoni because it guarantees secure, reliable, and transparent participation for all our members in our Annual General Meeting.',
      }),
      author: 'Ton Barnils',
      position: t('testimonials.ceec.position', { defaultValue: 'CEO' }),
      company: 'Centre Excursionista de Catalunya',
    },
    {
      image: '/assets/testimonials/auth.png',
      text: t('testimonials.auth.text', {
        defaultValue: 'Vocdoni has transformed how we conduct our voting processes',
      }),
      author: 'John Doe',
      position: t('testimonials.auth.position', { defaultValue: 'President' }),
      company: 'COIB',
    },
  ]

  const getRandomTestimonial = () => testimonials[Math.floor(Math.random() * testimonials.length)]

  return { testimonials, getRandomTestimonial }
}

const LayoutAuth = () => {
  const [title, setTitle] = useState<string | null>(null)
  const [subtitle, setSubtitle] = useState<string | null>(null)
  const { getRandomTestimonial } = useTestimonials()
  const [testimonial] = useState(() => getRandomTestimonial())

  return (
    <Flex justifyContent='center' alignItems='center' minH='100vh' p={{ base: 6, md: 10 }} bgColor='auth.bg'>
      <Flex
        w='full'
        maxW={{ base: 'sm', md: '3xl' }}
        boxShadow={'var(--shadow-sm)'}
        border='1px solid'
        borderColor='auth.border'
        borderRadius='lg'
        bgColor={'auth.card_bg'}
      >
        <Box p={{ base: 6, sm: 8 }} flex={{ base: '1 1 100%', md: '0 0 50%' }}>
          {(title || subtitle) && (
            <Box mb={6}>
              {title && (
                <Heading size='xs' fontWeight='extrabold' mb={1} letterSpacing={'-0.6px'}>
                  {title}
                </Heading>
              )}
              {subtitle && (
                <Text color={'auth.secondary_text'} size='sm'>
                  {subtitle}
                </Text>
              )}
            </Box>
          )}
          <Outlet context={{ setTitle, setSubtitle } satisfies AuthOutletContextType} />
        </Box>
        <Flex
          position='relative'
          flexDirection='column'
          flex={'0 0 50%'}
          display={{ base: 'none', md: 'block' }}
          bgImage={`linear-gradient(to top, rgb(17 24 39 / 0.8), rgb(17 24 39 / 0.3)), url(${testimonial.image})`}
          bgSize='cover'
          bgPosition='center'
          minH='100%'
        >
          <Box position='absolute' left={0} bottom={0} right={0} p={8}>
            <Text bottom={0} size='lg' fontWeight='bold' mb={2} color='auth.image_color'>
              {testimonial.text}
            </Text>
            <Text color='#ffffffb3' size='sm'>
              — {testimonial.author}, {testimonial.position} @ {testimonial.company}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default LayoutAuth
