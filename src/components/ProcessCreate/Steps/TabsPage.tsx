import { TabProps } from '@chakra-ui/tabs/dist/tab'
import { Box, Flex, Icon, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure } from '@chakra-ui/react'
import { Check } from '~theme/icons'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import ModalPro from '~components/ProcessCreate/ModalPro'
import { CgMoreO } from 'react-icons/cg'
import { StepsNavigation } from '~components/ProcessCreate/Steps/Navigation'
import Wrapper from '~components/ProcessCreate/Steps/Wrapper'

/**
 * These components implement the skeleton for tabs pages like questions or census types.
 */

export type GenericFeatureObject<T extends string> = {
  list: T[]
  defined: T[]
  details: Record<T, { icon: any; title: string; description: string; component?: () => JSX.Element }>
}

interface ITabsPageProps<Implemented extends string, UnImplemented extends string> {
  onTabChange: (index: number) => void
  title: string
  description: string
  selected: string | null
  definedList: GenericFeatureObject<Implemented>
  unimplementedList: GenericFeatureObject<UnImplemented>
}

export const TabsPage = <Implemented extends string, UnImplemented extends string>({
  definedList,
  unimplementedList,
  onTabChange,
  title,
  description,
  selected,
}: ITabsPageProps<Implemented, UnImplemented>) => {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  // const { form, setForm } = useProcessCreationSteps()
  const { defined, details } = definedList
  const { defined: definedUnim, details: detailsUnim } = unimplementedList

  const [reason, setReason] = useState('')
  const [showProCards, setShowProCards] = useState(false)

  if (!defined || !definedUnim) return null

  return (
    <Wrapper>
      <ModalPro isOpen={isOpen} onClose={onClose} reason={reason} />
      <Flex flexDirection='column' gap={5}>
        <Box>
          <Text className='process-create-title'>{title}</Text>
          <Text fontSize='sm' color='process_create.description'>
            {description}
          </Text>
        </Box>
        <Tabs defaultIndex={defined.findIndex((val) => val === selected)} onChange={onTabChange} variant='card' isLazy>
          <TabList mb={10}>
            <Box>
              {defined.map((ct: Implemented, index: number) => (
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
                  {definedUnim.map((ct: UnImplemented, index: number) => (
                    <TabCardSkeleton
                      key={index}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setReason(detailsUnim[ct].title)
                        onOpen()
                      }}
                      icon={detailsUnim[ct].icon}
                      title={detailsUnim[ct].title}
                      description={detailsUnim[ct].description}
                      pro
                    />
                  ))}
                </Box>
              </>
            )}
          </TabList>

          <TabPanels className={selected ? 'c' : ''} bgColor='process_create.section'>
            {defined.map((ct: Implemented, index: number) => {
              if (details[ct].component) {
                return details[ct].component && <TabPanel key={index}>{details[ct].component!()}</TabPanel>
              }
            })}
          </TabPanels>
        </Tabs>
      </Flex>
      <StepsNavigation />
    </Wrapper>
  )
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
