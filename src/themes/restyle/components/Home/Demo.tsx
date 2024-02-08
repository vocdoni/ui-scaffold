import { Box, Button, Flex, Grid, Text } from '@chakra-ui/react'
import { FaGoogle, FaSlack } from 'react-icons/fa'
import { FaCircleCheck } from 'react-icons/fa6'
import { GiChoice } from 'react-icons/gi'
import { GoNumber } from 'react-icons/go'
import { HiCheckBadge } from 'react-icons/hi2'
import { ImListNumbered } from 'react-icons/im'
import { MdAutoGraph, MdOutlineLibraryAddCheck } from 'react-icons/md'
import { VscListFilter } from 'react-icons/vsc'
import agm from '/assets/agm.avif'
import budgeting from '/assets/budgeting.avif'
import elections from '/assets/elections.avif'
import onlineSurvey from '/assets/online-survey.avif'
import onlineVoting from '/assets/online-voting.avif'
import softInt from '/assets/software-integration.avif'

const Demo = () => {
  return (
    <Box as='section' bgColor='#EFF1F2'>
      <Box className='site-wrapper' py={{ base: '60px', lg: '120px' }}>
        <Flex flexDirection={{ base: 'column', lg: 'row' }} mb='40px' gap={{ base: '40px', lg: 0 }}>
          <Box flex='1 1 50%'>
            <Text color='#175CFF' fontWeight='bold' mb='6px' fontSize='20px' lineHeight='24px'>
              Demo
            </Text>
            <Text fontWeight='bold' fontSize='40px' lineHeight='48px' mb='10px'>
              Test our solution in 3 easy clicks
            </Text>
            <Text fontSize='16px' lineHeight='28px' color='gray'>
              Dynamicly puruse convergence rather than 24/7 process improvments develop end-to-end customer service
              action items.
            </Text>
          </Box>
          <Flex flex='1 1 50%' justifyContent={{ base: 'center', lg: 'end' }} alignItems='center'>
            <Button w={{ base: 'full', sm: 'fit-content' }}>View All Demos</Button>
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
            <Text as='span'>Use Cases</Text>
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
            <Text as='span'>Voting Type</Text>
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
            <Text as='span'>Census / Authentication</Text>
          </Flex>
        </Flex>
        <Box mb='40px'>
          <Text fontWeight='bold' fontSize='20px' mb='20px' textAlign='center'>
            By Use Case
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
                  AGMs
                </Text>
              </Box>
            </Flex>
            <Flex justifyContent='center' alignItems='center'>
              <Box w='full' maxW='400px' bgColor='white' p='15px 20px' borderRadius='lg'>
                <Box h='145px' bgImage={elections} bgSize='cover' bgPosition='center' mb='15px' borderRadius='lg' />
                <Text fontSize='14px' fontWeight='bold' textAlign='center'>
                  Elections
                </Text>
              </Box>
            </Flex>
            <Flex justifyContent='center' alignItems='center'>
              <Box w='full' maxW='400px' bgColor='white' p='15px 20px' borderRadius='lg'>
                <Box h='145px' bgImage={budgeting} bgSize='cover' bgPosition='center' mb='15px' borderRadius='lg' />
                <Text fontSize='14px' fontWeight='bold' textAlign='center'>
                  Participation Budgeting
                </Text>
              </Box>
            </Flex>
            <Flex justifyContent='center' alignItems='center'>
              <Box w='full' maxW='400px' bgColor='white' p='15px 20px' borderRadius='lg'>
                <Box h='145px' bgImage={onlineVoting} bgSize='cover' bgPosition='center' mb='15px' borderRadius='lg' />
                <Text fontSize='14px' fontWeight='bold' textAlign='center'>
                  Online Voting
                </Text>
              </Box>
            </Flex>
            <Flex justifyContent='center' alignItems='center'>
              <Box w='full' maxW='400px' bgColor='white' p='15px 20px' borderRadius='lg'>
                <Box h='145px' bgImage={softInt} bgSize='cover' bgPosition='center' mb='15px' borderRadius='lg' />
                <Text fontSize='14px' fontWeight='bold' textAlign='center'>
                  Software Integration
                </Text>
              </Box>
            </Flex>
            <Flex justifyContent='center' alignItems='center'>
              <Box w='full' maxW='400px' bgColor='white' p='15px 20px' borderRadius='lg'>
                <Box h='145px' bgImage={onlineSurvey} bgSize='cover' bgPosition='center' mb='15px' borderRadius='lg' />
                <Text fontSize='14px' fontWeight='bold' textAlign='center'>
                  Gathered Online Survey
                </Text>
              </Box>
            </Flex>
          </Grid>
        </Box>
        <Box mb='40px'>
          <Text fontWeight='bold' fontSize='20px' mb='20px' textAlign='center'>
            By Voting Type
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
                  Single Choice
                </Text>
              </Box>
            </Flex>
            <Flex justifyContent='center' alignItems='center'>
              <Box w='full' maxW='400px' bgColor='white' p='15px 20px' borderRadius='lg'>
                <Flex h='110px' justifyContent='center' alignItems='center' mb='15px'>
                  <MdOutlineLibraryAddCheck size={75} color='#575757' />
                </Flex>
                <Text fontSize='14px' fontWeight='bold' textAlign='center'>
                  Multiple Choices
                </Text>
              </Box>
            </Flex>
            <Flex justifyContent='center' alignItems='center'>
              <Box w='full' maxW='400px' bgColor='white' p='15px 20px' borderRadius='lg'>
                <Flex h='110px' justifyContent='center' alignItems='center' mb='15px'>
                  <HiCheckBadge size={75} color='#575757' />
                </Flex>
                <Text fontSize='14px' fontWeight='bold' textAlign='center'>
                  Approval Voting
                </Text>
              </Box>
            </Flex>
            <Flex justifyContent='center' alignItems='center'>
              <Box w='full' maxW='400px' bgColor='white' p='15px 20px' borderRadius='lg'>
                <Flex h='110px' justifyContent='center' alignItems='center' mb='15px'>
                  <GoNumber size={75} color='#575757' />
                </Flex>
                <Text fontSize='14px' fontWeight='bold' textAlign='center'>
                  Budget Voting
                </Text>
              </Box>
            </Flex>
            <Flex justifyContent='center' alignItems='center'>
              <Box w='full' maxW='400px' bgColor='white' p='15px 20px' borderRadius='lg'>
                <Flex h='110px' justifyContent='center' alignItems='center' mb='15px'>
                  <ImListNumbered size={75} color='#575757' />
                </Flex>
                <Text fontSize='14px' fontWeight='bold' textAlign='center'>
                  Ranked Voting
                </Text>
              </Box>
            </Flex>
            <Flex justifyContent='center' alignItems='center'>
              <Box w='full' maxW='400px' bgColor='white' p='15px 20px' borderRadius='lg'>
                <Flex h='110px' justifyContent='center' alignItems='center' mb='15px'>
                  <VscListFilter size={75} color='#575757' />
                </Flex>
                <Text fontSize='14px' fontWeight='bold' textAlign='center'>
                  Weighted Voting
                </Text>
              </Box>
            </Flex>
          </Grid>
        </Box>
        <Box mb='40px'>
          <Text fontWeight='bold' fontSize='20px' mb='20px' textAlign='center'>
            By use case
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
                  E-Mail (GMail)
                </Text>
              </Box>
            </Flex>
            <Flex justifyContent='center' alignItems='center'>
              <Box w='full' maxW='400px' bgColor='white' p='15px 20px' borderRadius='lg'>
                <Flex h='40px' justifyContent='center' alignItems='center' mb='15px'>
                  <FaSlack size={30} color='#575757' />
                </Flex>
                <Text fontSize='14px' fontWeight='bold' textAlign='center'>
                  Ranked Voting
                </Text>
              </Box>
            </Flex>
            <Flex justifyContent='center' alignItems='center'>
              <Box w='full' maxW='400px' bgColor='white' p='15px 20px' borderRadius='lg'>
                <Flex h='40px' justifyContent='center' alignItems='center' mb='15px'>
                  <MdAutoGraph size={30} color='#575757' />
                </Flex>
                <Text fontSize='14px' fontWeight='bold' textAlign='center'>
                  Open Census
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
