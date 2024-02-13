import { Box, Button, Card, CardBody, Flex, Grid, Radio, RadioGroup, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { FaGoogle, FaSlack } from 'react-icons/fa'
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

  const [value, setValue] = useState('1')

  return (
    <Box as='section' id='usecases' bgColor='#EFF1F2'>
      <Box className='site-wrapper' py={{ base: '60px', lg: '100px' }}>
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
        <RadioGroup onChange={setValue} value={value}>
          <Flex gap='20px' flexDirection={{ base: 'column', sm: 'row' }} mb='60px'>
            <Radio variant='demo' value='1' flex='1 1 30%'>
              <Box>
                <BsFillCheckCircleFill size={25} />
              </Box>
              <Text as='span'>{t('home.demo.use_cases.radio')}</Text>
            </Radio>
            <Radio variant='demo' value='2' flex='1 1 30%'>
              <Box>
                <BsFillCheckCircleFill size={25} />
              </Box>
              <Text as='span'>{t('home.demo.voting_type.radio')}</Text>
            </Radio>
            <Radio variant='demo' value='3' flex='1 1 30%'>
              <Box>
                <BsFillCheckCircleFill size={25} />
              </Box>
              <Text as='span'>{t('home.demo.census_type.radio')}</Text>
            </Radio>
          </Flex>
        </RadioGroup>
        {value === '1' && (
          <Box mb='40px'>
            <Text fontWeight='bold' fontSize='20px' mb='20px' textAlign='center'>
              {t('home.demo.use_cases.title')}
            </Text>
            <Grid
              templateColumns={{
                base: 'repeat(auto-fill, minmax(200px, 1fr))',
                sm: 'repeat(auto-fill, minmax(300px, 1fr))',
                xl: 'repeat(auto-fill, minmax(350px, 1fr))',
              }}
              gap='20px'
            >
              <Card as='a' href='' variant='demo'>
                <CardBody>
                  <Box bgImage={agm} h='145px' />
                  <Text> {t('home.demo.use_cases.card_1')}</Text>
                </CardBody>
              </Card>
              <Card as='a' href='' variant='demo'>
                <CardBody>
                  <Box bgImage={elections} h='145px' />
                  <Text>{t('home.demo.use_cases.card_2')}</Text>
                </CardBody>
              </Card>
              <Card as='a' href='' variant='demo'>
                <CardBody>
                  <Box bgImage={participatory} h='145px' />
                  <Text>{t('home.demo.use_cases.card_3')}</Text>
                </CardBody>
              </Card>
              <Card as='a' href='' variant='demo'>
                <CardBody>
                  <Box bgImage={onlineVoting} h='145px' />
                  <Text>{t('home.demo.use_cases.card_4')}</Text>
                </CardBody>
              </Card>
              <Card as='a' href='' variant='demo'>
                <CardBody>
                  <Box bgImage={softInt} h='145px' />
                  <Text>{t('home.demo.use_cases.card_5')}</Text>
                </CardBody>
              </Card>
              <Card as='a' href='' variant='demo'>
                <CardBody>
                  <Box bgImage={onlineSurvey} h='145px' />
                  <Text>{t('home.demo.use_cases.card_6')}</Text>
                </CardBody>
              </Card>
            </Grid>
          </Box>
        )}
        {value === '2' && (
          <Box mb='40px'>
            <Text fontWeight='bold' fontSize='20px' mb='20px' textAlign='center'>
              {t('home.demo.voting_type.title')}
            </Text>
            <Grid
              templateColumns={{
                base: 'repeat(auto-fill, minmax(200px, 1fr))',
                sm: 'repeat(auto-fill, minmax(400px, 1fr))',
                xl: 'repeat(auto-fill, minmax(350px, 1fr))',
              }}
              gap='20px'
            >
              <Card as='a' href='' variant='demo'>
                <CardBody>
                  <Box h='110px'>
                    <GiChoice />
                  </Box>
                  <Text>{t('home.demo.voting_type.card_1')}</Text>
                </CardBody>
              </Card>
              <Card as='a' href='' variant='demo'>
                <CardBody>
                  <Box h='110px'>
                    <MdOutlineLibraryAddCheck />
                  </Box>
                  <Text>{t('home.demo.voting_type.card_2')}</Text>
                </CardBody>
              </Card>
              <Card as='a' href='' variant='demo'>
                <CardBody>
                  <Box h='110px'>
                    <HiCheckBadge />
                  </Box>
                  <Text>{t('home.demo.voting_type.card_3')}</Text>
                </CardBody>
              </Card>
              <Card as='a' href='' variant='demo'>
                <CardBody>
                  <Box h='110px'>
                    <GoNumber />
                  </Box>
                  <Text>{t('home.demo.voting_type.card_4')}</Text>
                </CardBody>
              </Card>
              <Card as='a' href='' variant='demo'>
                <CardBody>
                  <Box h='110px'>
                    <ImListNumbered />
                  </Box>
                  <Text>{t('home.demo.voting_type.card_5')}</Text>
                </CardBody>
              </Card>
              <Card as='a' href='' variant='demo'>
                <CardBody>
                  <Box h='110px'>
                    <VscListFilter />
                  </Box>
                  <Text>{t('home.demo.voting_type.card_6')}</Text>
                </CardBody>
              </Card>
            </Grid>
          </Box>
        )}
        {value === '3' && (
          <Box mb='40px'>
            <Text fontWeight='bold' fontSize='20px' mb='20px' textAlign='center'>
              {t('home.demo.census_type.title')}
            </Text>
            <Grid
              templateColumns={{
                base: 'repeat(auto-fill, minmax(200px, 1fr))',
                sm: 'repeat(auto-fill, minmax(400px, 1fr))',
                xl: 'repeat(auto-fill, minmax(350px, 1fr))',
              }}
              gap='20px'
            >
              <Card as='a' href='' variant='demo'>
                <CardBody>
                  <Box h='110px'>
                    <FaGoogle />
                  </Box>
                  <Text>{t('home.demo.census_type.card_1')}</Text>
                </CardBody>
              </Card>
              <Card as='a' href='' variant='demo'>
                <CardBody>
                  <Box h='110px'>
                    <FaSlack />
                  </Box>
                  <Text>{t('home.demo.voting_type.card_6')}</Text>
                </CardBody>
              </Card>
              <Card as='a' href='' variant='demo'>
                <CardBody>
                  <Box h='110px'>
                    <MdAutoGraph />
                  </Box>
                  <Text>{t('home.demo.census_type.card_3')}</Text>
                </CardBody>
              </Card>
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Demo
