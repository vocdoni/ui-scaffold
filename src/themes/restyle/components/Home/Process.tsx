import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { MdDesignServices } from 'react-icons/md'
import process from '/assets/vocdoni_usage.jpg'

const Process = () => {
  return (
    <Box as='section' className='site-wrapper' py={{ base: '60px', lg: '120px' }}>
      <Text color='#175CFF' fontWeight='bold' mb='6px' textAlign='center' fontSize='20px' lineHeight='24px'>
        Process
      </Text>
      <Text fontWeight='bold' fontSize='40px' lineHeight='48px' mb='10px' textAlign='center'>
        A simple 4 steps process
      </Text>
      <Text fontSize='16px' lineHeight='28px' color='gray' textAlign='center'>
        Enthusiastically engage cross-media leadership skills for alternative experiences.
      </Text>
      <Text fontSize='16px' lineHeight='28px' color='gray' mb='60px' textAlign='center'>
        Proactively drive vertical systems than intuitive architectures.
      </Text>
      <Flex flexDirection={{ base: 'column', lg: 'row' }} gap={{ base: '40px', lg: '60px' }}>
        <Flex flex='1 1 50%' justifyContent={{ base: 'center', lg: 'end' }} alignItems='center'>
          <Image src={process} borderRadius='lg' w='535px' />
        </Flex>
        <Flex flex='1 1' flexBasis={{ lg: '50%' }} flexDirection='column' justifyContent='space-between' gap='40px'>
          <Flex gap='24px'>
            <Flex
              justifyContent='center'
              alignItems='center'
              borderRadius='lg'
              minW='45px'
              h='45px'
              border='1px solid gray'
            >
              <MdDesignServices size={25} color='gray' />
            </Flex>
            <Box>
              <Text fontSize='17px' lineHeight='20.4px' color='#175CFF' fontWeight='bold' mb='6px'>
                Step 1
              </Text>
              <Text fontSize='20px' lineHeight='24px' fontWeight='bold' mb='8px'>
                Start your own process or contact us
              </Text>
              <Text color='gray' fontSize='16px' lineHeight='28px'>
                Progressivly foster enterprise-wide systems whereas equity invested web-readiness harness installed base
                bandwidth.
              </Text>
            </Box>
          </Flex>
          <Flex gap='24px'>
            <Flex
              justifyContent='center'
              alignItems='center'
              borderRadius='lg'
              minW='45px'
              h='45px'
              border='1px solid gray'
            >
              <MdDesignServices size={25} color='gray' />
            </Flex>
            <Box>
              <Text fontSize='17px' lineHeight='20.4px' color='#175CFF' fontWeight='bold' mb='6px'>
                Step 2
              </Text>
              <Text fontSize='20px' lineHeight='24px' fontWeight='bold' mb='8px'>
                Configure and Publish your voting process
              </Text>
              <Text color='gray' fontSize='16px' lineHeight='28px'>
                Dramatically administrate progressive metrics without error-free globally simplify standarized
                alignments plagiarize distributed.
              </Text>
            </Box>
          </Flex>
          <Flex gap='24px'>
            <Flex
              justifyContent='center'
              alignItems='center'
              borderRadius='lg'
              minW='45px'
              h='45px'
              border='1px solid gray'
            >
              <MdDesignServices size={25} color='gray' />
            </Flex>
            <Box>
              <Text fontSize='17px' lineHeight='20.4px' color='#175CFF' fontWeight='bold' mb='6px'>
                Step 3
              </Text>
              <Text fontSize='20px' lineHeight='24px' fontWeight='bold' mb='8px'>
                Voters authenticate & vote
              </Text>
              <Text color='gray' fontSize='16px' lineHeight='28px'>
                Interactivly whiteboard transparent testing procedures before bricks-and-clicks initiatives adminsitarte
                competencies.
              </Text>
            </Box>
          </Flex>
          <Flex gap='24px'>
            <Flex
              justifyContent='center'
              alignItems='center'
              borderRadius='lg'
              minW='45px'
              h='45px'
              border='1px solid gray'
            >
              <MdDesignServices size={25} color='gray' />
            </Flex>
            <Box>
              <Text fontSize='17px' lineHeight='20.4px' color='#175CFF' fontWeight='bold' mb='6px'>
                Step 4
              </Text>
              <Text fontSize='20px' lineHeight='24px' fontWeight='bold' mb='8px'>
                Get the results - As easy as that
              </Text>
              <Text color='gray' fontSize='16px' lineHeight='28px'>
                Interactivly whiteboard transparent testing procedures before bricks-and-clicks initiatives adminsitarte
                competencies.
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}
export default Process
