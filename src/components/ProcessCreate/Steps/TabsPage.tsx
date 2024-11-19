import { Box, Flex, Icon, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure } from '@chakra-ui/react'
import { TabProps } from '@chakra-ui/tabs/dist/tab'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CgMoreO } from 'react-icons/cg'
import ModalPro from '~components/ProcessCreate/ModalPro'
import { StepsNavigation } from '~components/ProcessCreate/Steps/Navigation'
import Wrapper from '~components/ProcessCreate/Steps/Wrapper'
import { Check } from '~theme/icons'
import { convertParagraphs } from '~utils/components'

/**
 * These components implement the skeleton for tabs pages like questions or census types.
 */

export type GenericFeatureObjectProps = { icon: any; title: string; description: string; component?: () => JSX.Element }
export type GenericFeatureObjectDetailsRecord<T extends string> = Record<T, GenericFeatureObjectProps>
export type GenericFeatureObject<T extends string> = {
  defined: T[]
  details: GenericFeatureObjectDetailsRecord<T>
}

export interface ITabsPageProps<Implemented extends string, UnImplemented extends string> {
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
          <Text variant='process-create-title'>{title}</Text>
          <Text variant='process-create-subtitle-sm'>{description}</Text>
        </Box>
        <Tabs defaultIndex={defined.findIndex((val) => val === selected)} onChange={onTabChange} variant='card' isLazy>
          <TabList mb={10}>
            <>
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
                />
              )}
            </>

            {showProCards && (
              <>
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
              </>
            )}
          </TabList>

          <TabPanels className={selected ? 'c' : ''}>
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
}: ITabsCardSkeletonProps & TabProps) => (
  <Tab onClick={onClick} mb={5} {...props}>
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
      <Text>{convertParagraphs(title)}</Text>
    </Box>
    <Text id={'description'}>{description}</Text>
  </Tab>
)
