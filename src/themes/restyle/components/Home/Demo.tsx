import { Box, Button, Flex, Grid, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaGoogle, FaSlack } from 'react-icons/fa'
import { FaCircleCheck } from 'react-icons/fa6'
import { GiChoice } from 'react-icons/gi'
import { GoNumber } from 'react-icons/go'
import { HiCheckBadge } from 'react-icons/hi2'
import { ImListNumbered } from 'react-icons/im'
import { MdAutoGraph, MdOutlineLibraryAddCheck } from 'react-icons/md'
import { VscListFilter } from 'react-icons/vsc'
import agm from '/assets/agm.avif'
import participatory from '/assets/budgeting.avif'
import elections from '/assets/elections.avif'
import onlineSurvey from '/assets/online-survey.avif'
import onlineVoting from '/assets/online-voting.avif'
import softInt from '/assets/software-integration.avif'

const Demo = () => {
  const { t } = useTranslation()

  return (
    <Box as='section' id='usecases' bgColor='#EFF1F2'>
      <Box className='site-wrapper' py={{ base: '60px', lg: '120px' }}>
        <Flex flexDirection={{ base: 'column', lg: 'row' }} mb='40px' gap={{ base: '40px', lg: 0 }}>
          <Box flex='1 1 50%'>
            <Text color='#175CFF' fontWeight='bold' mb='6px' fontSize='20px' lineHeight='24px'>
              {t('home.demo.header')}
            </Text>
            <Text fontWeight='bold' fontSize='40px' lineHeight='48px' mb='10px'>
              {t('home.demo.title')}
            </Text>
            <Text fontSize='16px' lineHeight='28px' color='gray'>
              {t('home.demo.description')}
            </Text>
          </Box>
          <Flex flex='1 1 50%' justifyContent={{ base: 'center', lg: 'end' }} alignItems='center'>
            <Button w={{ base: 'full', sm: 'fit-content' }}> {t('home.demo.btn')}</Button>
          </Flex>
        </Flex>
        <Flex gap='20px' flexDirection={{ base: 'column', sm: 'row' }} mb='60px'>
          <Flex
            flex='1 1 30%'
            alignItems='center'
            gap={2}
            borderRadius='md'
            boxShadow='rgba(12, 8, 0, 0.03) 0px 2px 4.8px -1px, rgba(12, 8, 0, 0.06) 0px 4.4px 12px -1px'
            p={3}
            bgColor='white'
            fontWeight='bold'
          >
            <Box minW='25px'>
              <FaCircleCheck color='#175CFF' size={25} />
            </Box>
            <Text as='span'>{t('home.demo.use_cases.radio')}</Text>
          </Flex>
          <Flex
            flex='1 1 30%'
            alignItems='center'
            gap={2}
            borderRadius='md'
            boxShadow='rgba(12, 8, 0, 0.03) 0px 2px 4.8px -1px, rgba(12, 8, 0, 0.06) 0px 4.4px 12px -1px'
            p={3}
            bgColor='white'
            fontWeight='bold'
          >
            <Box minW='25px'>
              <FaCircleCheck color='#175CFF' size={25} />
            </Box>
            <Text as='span'>{t('home.demo.voting_type.radio')}</Text>
          </Flex>
          <Flex
            flex='1 1 30%'
            alignItems='center'
            gap={2}
            borderRadius='md'
            boxShadow='rgba(12, 8, 0, 0.03) 0px 2px 4.8px -1px, rgba(12, 8, 0, 0.06) 0px 4.4px 12px -1px'
            p={3}
            bgColor='white'
            fontWeight='bold'
          >
            <Box minW='25px'>
              <FaCircleCheck color='#175CFF' size={25} />
            </Box>
            <Text as='span'>{t('home.demo.census_type.radio')}</Text>
          </Flex>
        </Flex>
        <Box mb='40px'>
          <Text fontWeight='bold' fontSize='20px' mb='20px' textAlign='center'>
            {t('home.demo.use_cases.title')}
          </Text>
          <Grid
            templateColumns={{
              base: 'repeat(auto-fill, minmax(200px, 1fr))',
              sm: 'repeat(auto-fill, minmax(300px, 1fr))',
            }}
            gap='20px'
          >
            <Flex justifyContent='center' alignItems='center'>
              <Box w='full' maxW='400px' bgColor='white' p='15px 20px' borderRadius='lg'>
                <Box h='145px' bgImage={agm} bgSize='cover' bgPosition='center' mb='15px' borderRadius='lg' />
                <Text fontSize='14px' fontWeight='bold' textAlign='center'>
                  {t('home.demo.use_cases.card_1')}
                </Text>
              </Box>
            </Flex>
            <Flex justifyContent='center' alignItems='center'>
              <Box w='full' maxW='400px' bgColor='white' p='15px 20px' borderRadius='lg'>
                <Box h='145px' bgImage={elections} bgSize='cover' bgPosition='center' mb='15px' borderRadius='lg' />
                <Text fontSize='14px' fontWeight='bold' textAlign='center'>
                  {t('home.demo.use_cases.card_2')}
                </Text>
              </Box>
            </Flex>
            <Flex justifyContent='center' alignItems='center'>
              <Box w='full' maxW='400px' bgColor='white' p='15px 20px' borderRadius='lg'>
                <Box h='145px' bgImage={participatory} bgSize='cover' bgPosition='center' mb='15px' borderRadius='lg' />
                <Text fontSize='14px' fontWeight='bold' textAlign='center'>
                  {t('home.demo.use_cases.card_3')}
                </Text>
              </Box>
            </Flex>
            <Flex justifyContent='center' alignItems='center'>
              <Box w='full' maxW='400px' bgColor='white' p='15px 20px' borderRadius='lg'>
                <Box h='145px' bgImage={onlineVoting} bgSize='cover' bgPosition='center' mb='15px' borderRadius='lg' />
                <Text fontSize='14px' fontWeight='bold' textAlign='center'>
                  {t('home.demo.use_cases.card_4')}
                </Text>
              </Box>
            </Flex>
            <Flex justifyContent='center' alignItems='center'>
              <Box w='full' maxW='400px' bgColor='white' p='15px 20px' borderRadius='lg'>
                <Box h='145px' bgImage={softInt} bgSize='cover' bgPosition='center' mb='15px' borderRadius='lg' />
                <Text fontSize='14px' fontWeight='bold' textAlign='center'>
                  {t('home.demo.use_cases.card_5')}
                </Text>
              </Box>
            </Flex>
            <Flex justifyContent='center' alignItems='center'>
              <Box w='full' maxW='400px' bgColor='white' p='15px 20px' borderRadius='lg'>
                <Box h='145px' bgImage={onlineSurvey} bgSize='cover' bgPosition='center' mb='15px' borderRadius='lg' />
                <Text fontSize='14px' fontWeight='bold' textAlign='center'>
                  {t('home.demo.use_cases.card_6')}
                </Text>
              </Box>
            </Flex>
          </Grid>
        </Box>
        <Box mb='40px'>
          <Text fontWeight='bold' fontSize='20px' mb='20px' textAlign='center'>
            {t('home.demo.voting_type.title')}
          </Text>
          <Grid
            templateColumns={{
              base: 'repeat(auto-fill, minmax(200px, 1fr))',
              sm: 'repeat(auto-fill, minmax(300px, 1fr))',
            }}
            gap='20px'
          >
            <Flex justifyContent='center' alignItems='center'>
              <Box w='full' maxW='400px' bgColor='white' p='15px 20px' borderRadius='lg'>
                <Flex h='110px' justifyContent='center' alignItems='center' mb='15px'>
                  <GiChoice size={75} color='#575757' />
                </Flex>
                <Text fontSize='14px' fontWeight='bold' textAlign='center'>
                  {t('home.demo.voting_type.card_1')}
                </Text>
              </Box>
            </Flex>
            <Flex justifyContent='center' alignItems='center'>
              <Box w='full' maxW='400px' bgColor='white' p='15px 20px' borderRadius='lg'>
                <Flex h='110px' justifyContent='center' alignItems='center' mb='15px'>
                  <MdOutlineLibraryAddCheck size={75} color='#575757' />
                </Flex>
                <Text fontSize='14px' fontWeight='bold' textAlign='center'>
                  {t('home.demo.voting_type.card_2')}
                </Text>
              </Box>
            </Flex>
            <Flex justifyContent='center' alignItems='center'>
              <Box w='full' maxW='400px' bgColor='white' p='15px 20px' borderRadius='lg'>
                <Flex h='110px' justifyContent='center' alignItems='center' mb='15px'>
                  <HiCheckBadge size={75} color='#575757' />
                </Flex>
                <Text fontSize='14px' fontWeight='bold' textAlign='center'>
                  {t('home.demo.voting_type.card_3')}
                </Text>
              </Box>
            </Flex>
            <Flex justifyContent='center' alignItems='center'>
              <Box w='full' maxW='400px' bgColor='white' p='15px 20px' borderRadius='lg'>
                <Flex h='110px' justifyContent='center' alignItems='center' mb='15px'>
                  <GoNumber size={75} color='#575757' />
                </Flex>
                <Text fontSize='14px' fontWeight='bold' textAlign='center'>
                  {t('home.demo.voting_type.card_4')}
                </Text>
              </Box>
            </Flex>
            <Flex justifyContent='center' alignItems='center'>
              <Box w='full' maxW='400px' bgColor='white' p='15px 20px' borderRadius='lg'>
                <Flex h='110px' justifyContent='center' alignItems='center' mb='15px'>
                  <ImListNumbered size={75} color='#575757' />
                </Flex>
                <Text fontSize='14px' fontWeight='bold' textAlign='center'>
                  {t('home.demo.voting_type.card_5')}
                </Text>
              </Box>
            </Flex>
            <Flex justifyContent='center' alignItems='center'>
              <Box w='full' maxW='400px' bgColor='white' p='15px 20px' borderRadius='lg'>
                <Flex h='110px' justifyContent='center' alignItems='center' mb='15px'>
                  <VscListFilter size={75} color='#575757' />
                </Flex>
                <Text fontSize='14px' fontWeight='bold' textAlign='center'>
                  {t('home.demo.voting_type.card_6')}
                </Text>
              </Box>
            </Flex>
          </Grid>
        </Box>
        <Box mb='40px'>
          <Text fontWeight='bold' fontSize='20px' mb='20px' textAlign='center'>
            {t('home.demo.census_type.title')}
          </Text>
          <Grid
            templateColumns={{
              base: 'repeat(auto-fill, minmax(200px, 1fr))',
              sm: 'repeat(auto-fill, minmax(300px, 1fr))',
            }}
            gap='20px'
          >
            <Flex justifyContent='center' alignItems='center'>
              <Box w='full' maxW='400px' bgColor='white' p='15px 20px' borderRadius='lg'>
                <Flex h='40px' justifyContent='center' alignItems='center' mb='15px'>
                  <FaGoogle size={30} color='#575757' />
                </Flex>
                <Text fontSize='14px' fontWeight='bold' textAlign='center'>
                  {t('home.demo.census_type.card_1')}
                </Text>
              </Box>
            </Flex>
            <Flex justifyContent='center' alignItems='center'>
              <Box w='full' maxW='400px' bgColor='white' p='15px 20px' borderRadius='lg'>
                <Flex h='40px' justifyContent='center' alignItems='center' mb='15px'>
                  <FaSlack size={30} color='#575757' />
                </Flex>
                <Text fontSize='14px' fontWeight='bold' textAlign='center'>
                  {t('home.demo.census_type.card_2')}
                </Text>
              </Box>
            </Flex>
            <Flex justifyContent='center' alignItems='center'>
              <Box w='full' maxW='400px' bgColor='white' p='15px 20px' borderRadius='lg'>
                <Flex h='40px' justifyContent='center' alignItems='center' mb='15px'>
                  <MdAutoGraph size={30} color='#575757' />
                </Flex>
                <Text fontSize='14px' fontWeight='bold' textAlign='center'>
                  {t('home.demo.census_type.card_3')}
                </Text>
              </Box>
            </Flex>
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}

export default Demo
