import { Box, Flex, Icon, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CgMoreO } from 'react-icons/cg'
import { Check } from '~theme/icons'
import { CensusType, useCensusTypes } from '../Census/TypeSelector'
import { UnimplementedCensusType, useUnimplementedCensusTypes } from '../Census/UnimplementedTypeSelector'
import ModalPro from '../ModalPro'
import { StepsNavigation } from './Navigation'
import { StepsFormValues, useProcessCreationSteps } from './use-steps'
import Wrapper from './Wrapper'
import { TabProps } from '@chakra-ui/tabs/dist/tab'

export interface CensusValues {
  censusType: CensusType | null
}

interface ITabsCardSkeletonProps {
  onClick: ((e: any) => void) | undefined
  icon: any
  title: string
  description: string
  check?: boolean
  pro?: boolean
}

const TabCardSkeleton = ({
  onClick,
  icon,
  title,
  description,
  check = false,
  pro = false,
  ...props
}: ITabsCardSkeletonProps & TabProps) => {
  return (
    <Tab onClick={onClick} {...props}>
      {check && (
        <>
          <Check />
          <Box id={'empty-check'} />
        </>
      )}
      {pro && (
        <Box>
          <Box id={'pro-badge'}>Pro</Box>
        </Box>
      )}
      <Box id={'title'}>
        <Icon as={icon} />
        <Text>{title}</Text>
      </Box>
      <Text id={'description'}>{description}</Text>
    </Tab>
  )
}

export const Census = () => {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { form, setForm } = useProcessCreationSteps()
  const { defined, details } = useCensusTypes()
  const { defined: definedUnim, details: detailsUnim } = useUnimplementedCensusTypes()
  const { censusType } = form

  const [reason, setReason] = useState('')
  const [showProCards, setShowProCards] = useState(false)

  return (
    <Wrapper>
      <ModalPro isOpen={isOpen} onClose={onClose} reason={reason} />
      <Flex flexDirection='column' gap={5}>
        <Box>
          <Text className='process-create-title'>{t('census.title')}</Text>
          <Text fontSize='sm' color='process_create.description'>
            {t('census.description')}
          </Text>
        </Box>
        <Tabs
          defaultIndex={defined.findIndex((val) => val === censusType)}
          onChange={(index) => {
            const nform: StepsFormValues = { ...form, censusType: defined[index] }
            // ensure maxCensusSize is only set on token-based censuses
            // all other cases are handled automatically via the SDK
            if (defined[index] !== 'token' && 'maxCensusSize' in nform) {
              delete nform?.maxCensusSize
            }

            if (definedUnim[index - defined.length]) setReason(detailsUnim[definedUnim[index - defined.length]].title)

            setForm(nform)
          }}
          variant='card'
          isLazy
        >
          <TabList mb={10}>
            <Box>
              {defined.map((ct: CensusType, index: number) => (
                <TabCardSkeleton
                  key={index}
                  onClick={() => setShowProCards(false)}
                  icon={details[ct].icon}
                  title={details[ct].title}
                  description={details[ct].description}
                  check
                />
              ))}
              {!!definedUnim.length && (
                <TabCardSkeleton
                  onClick={() => setShowProCards((prev) => !prev)}
                  icon={CgMoreO}
                  title={t('process_create.census.others_title')}
                  description={t('process_create.census.others_description')}
                  transform={showProCards ? 'scale(0.92)' : ''}
                />
              )}
            </Box>

            {showProCards && (
              <>
                <Text className='process-create-title' mt={5} mb={3}>
                  {t('census.pro')}
                </Text>
                <Box>
                  {definedUnim.map((ct: UnimplementedCensusType, index: number) => (
                    <TabCardSkeleton
                      key={index}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        onOpen()
                      }}
                      icon={detailsUnim[ct].icon}
                      title={detailsUnim[ct].title}
                      description={detailsUnim[ct].description}
                      pro
                    />
                    // <Tab
                    //   key={index}
                    //   onClick={(e) => {
                    //     e.preventDefault()
                    //     e.stopPropagation()
                    //     onOpen()
                    //   }}
                    // >
                    //   <Box>
                    //     <Icon as={detailsUnim[ct].icon} />
                    //     <Text>{detailsUnim[ct].title}</Text>
                    //   </Box>
                    //   <Text>{detailsUnim[ct].description}</Text>
                    //   <Text id={'pro-badge'}>Pro</Text>
                    // </Tab>
                  ))}
                </Box>
              </>
            )}
          </TabList>

          <TabPanels className={censusType ? 'c' : ''} bgColor='process_create.section'>
            {defined.map((ct: CensusType, index: number) => (
              <TabPanel key={index}>{details[ct].component()}</TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Flex>
      <StepsNavigation />
    </Wrapper>
  )
}
