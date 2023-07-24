// import { Box, Button, Flex, Img, Text } from '@chakra-ui/react'
// import { useTranslation } from 'react-i18next'
// import bannerLogo from '/assets/banner.png'

// const Banner = () => {
//   const { t } = useTranslation()
//   return (
//     <Box
//       px={{ base: 5, sm: 6 }}
//       pt={5}
//       paddingBottom={10}
//       marginTop={{ base: 0, sm: 20 }}
//       // boxShadow='var(--box-shadow-banner)'
//       // background='home.banner.bg'
//       marginBottom={16}
//       borderRadius='lg'
//       // opacity={0.8}
//       maxW={{ xl: '1400px' }}
//       mx='auto'
//     >
//       <Flex
//         flexDirection='column'
//         marginTop={{ base: '-30', sm: '-24', xl: 0 }}
//         alignItems={{ base: 'center', xl: 'start' }}
//       >
//         <Img
//           src={bannerLogo}
//           alt=''
//           // transform='rotate(13deg)'
//           width={{ base: '70%', sm: '40%', md: '30%', lg: '20%' }}
//           display={{ xl: 'none' }}
//         />
//         {/* <Image
//           src='https://cdn3d.iconscout.com/3d/premium/thumb/cryptocurrency-wallet-5432053-4533151.png'
//           alt=''
//           transform='rotate(13deg)'
//           width={{ base: '70%', sm: '40%', md: '30%', lg: '20%' }}
//           display={{ xl: 'none' }}
//         /> */}
//         <Text
//           as='h1'
//           fontSize='xl5'
//           fontWeight='extrabold'
//           // color='home.banner.color'
//           // textShadow='1px 2px 4px rgba(2,2,2,0.8)'
//           textAlign={{ base: 'center', xl: 'start' }}
//         >
//           {t('banner.subtitle')}
//         </Text>
//       </Flex>
//       <Text
//         as='h3'
//         // color='home.banner.color'
//         fontSize='xl2'
//         // textShadow='1px 2px 4px rgba(0,0,0,0.8)'
//         textAlign={{ base: 'center', xl: 'start' }}
//       >
//         {t('banner.title')}
//       </Text>
//       <Flex
//         flexDirection={{ base: 'column', sm: 'row' }}
//         gap={5}
//         justifyContent={{ base: 'center', xl: 'start' }}
//         alignItems='center'
//         marginTop={10}
//       >
//         <Button colorScheme='primary'>{t('banner.start_now')}</Button>
//         <Button>{t('banner.know_more')}</Button>
//       </Flex>
//       <Img
//         src={bannerLogo}
//         order={{ base: 1, md: 2 }}
//         alt=''
//         float='right'
//         // transform='rotate(13deg)'
//         marginTop='-305px'
//         width='35%'
//         display={{ base: 'none', xl: 'block' }}
//       />
//       {/* <Image
//         order={{ base: 1, md: 2 }}
//         src='https://cdn3d.iconscout.com/3d/premium/thumb/cryptocurrency-wallet-5432053-4533151.png'
//         alt=''
//         float='right'
//         transform='rotate(13deg)'
//         marginTop='-305px'
//         width='35%'
//         display={{ base: 'none', xl: 'block' }}
//       /> */}
//     </Box>
//   )
// }

// export default Banner
import { Box, Button, Flex, Img, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import bannerLogo from '/assets/banner.png'

const Banner = () => {
  const { t } = useTranslation()
  return (
    <Flex
      flexDirection={{ base: 'column', md: 'row' }}
      justifyContent='space-between'
      alignItems='center'
      maxW='1100px'
      mx='auto'
      px={{ md2: 10, lg: 14 }}
    >
      <Img
        src={bannerLogo}
        alt=''
        width={{ base: '50%', sm: '40%', md: '300px', md2: '320px', lg: '350px', xl: '400px' }}
        order={{ base: 0, md: 1 }}
      />

      <Box pt={{ base: 5 }} px={{ sm: 10, md: 0 }}>
        <Text
          as='h1'
          fontSize={{ base: 'xl3', sm: 'xl4', md: 'xl3' }}
          fontWeight='extrabold'
          textAlign={{ base: 'center', md: 'start' }}
          pb={{ base: 3, md: 1 }}
          width={{ md: '420px' }}
          lineHeight={{ md: 1.4 }}
        >
          {t('banner.title')}
        </Text>
        <Text as='h2' fontSize={{ base: 'xl', md: 'lg' }} textAlign={{ base: 'center', md: 'start' }}>
          {t('banner.subtitle')}
        </Text>
        <Flex
          flexDirection={{ base: 'column', sm: 'row' }}
          gap={5}
          justifyContent={{ base: 'center', md: 'start' }}
          alignItems='center'
          marginTop={{ base: 10, md: 4 }}
        >
          <Button colorScheme='primary'>{t('banner.start_now')}</Button>
          <Button>{t('banner.know_more')}</Button>
        </Flex>
      </Box>
    </Flex>
  )
}

export default Banner
