import {
  Badge,
  Box,
  Flex,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  TabProps,
  Tabs,
  Text,
  useDisclosure,
  useMultiStyleConfig,
} from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { CgMoreO } from 'react-icons/cg'
import { PiMedal } from 'react-icons/pi'
import { useSubscription } from '~components/Auth/Subscription'
import { hasFeature } from '~components/Pricing/Features'
import { usePricingModal } from '~components/Pricing/use-pricing-modal'
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
  permissionsPath?: string
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
  permissionsPath,
}: ITabsPageProps<Implemented, UnImplemented>) => {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { permission, subscription } = useSubscription()
  const { openModal } = usePricingModal()
  const { defined, details } = definedList
  const { defined: definedUnim, details: detailsUnim } = unimplementedList
  const [tab, setTab] = useState<number>(defined.findIndex((val) => val === selected))
  const [reason, setReason] = useState('')
  const [showProCards, setShowProCards] = useState(false)

  if (!defined || !definedUnim) return null

  // Store upgrade requirements per feature for later use
  const requireUpgrade = useMemo(
    () =>
      defined.map((ct: Implemented) => {
        if (permissionsPath) {
          return (hasFeature(subscription.plan, permissionsPath) && permission(`${permissionsPath}.${ct}`)) === false
        }
        return false
      }),
    [subscription]
  )

  return (
    <Wrapper>
      <ModalPro isOpen={isOpen} onClose={onClose} reason={reason} />
      <Flex flexDirection='column' gap={5}>
        <Box>
          <Text fontWeight={'bold'}>{title}</Text>
          <Text>{description}</Text>
        </Box>

        <Tabs
          defaultIndex={defined.findIndex((val) => val === selected)}
          index={tab}
          onChange={(index: number) => {
            // Check if the feature requires an account upgrade
            if (permissionsPath) {
              const requiresUpgrade = requireUpgrade[index] || false
              const key = defined[index]

              if (requiresUpgrade) {
                openModal('planUpgrade', {
                  feature: `${permissionsPath}.${key}`,
                  text: details[key].title,
                })
                return false
              }
            }

            setTab(index)
            onTabChange(index)
          }}
          variant='card'
          isLazy
        >
          <TabList mb={10}>
            <>
              {defined.map((ct: Implemented, index: number) => {
                const needsUpgrade = requireUpgrade[index] || false
                return (
                  <TabCardSkeleton
                    key={index}
                    onClick={() => {
                      setShowProCards(false)
                    }}
                    icon={details[ct].icon}
                    title={details[ct].title}
                    description={details[ct].description}
                    check
                    needsUpgrade={needsUpgrade}
                  />
                )
              })}
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
                    needsUpgrade
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
  needsUpgrade?: boolean
}

const TabCardSkeleton = ({
  onClick,
  icon,
  title,
  description,
  check = false,
  needsUpgrade = false,
  ...props
}: ITabsCardSkeletonProps & TabProps) => {
  const styles = useMultiStyleConfig('DetailedCheckbox', props)

  return (
    <Tab onClick={onClick} {...props} sx={styles.checkbox}>
      {check && !needsUpgrade && (
        <>
          <Check />
          <Box
            className='empty'
            sx={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              w: 4,
              h: 4,
              borderRadius: 'full',
              border: `1px solid`,
              borderColor: 'tab.variant.card.border',
              color: 'inherit',
            }}
          />
        </>
      )}

      <Box sx={styles.title}>
        <Icon as={icon} sx={styles.icon} />
        <Box textAlign='start'>{convertParagraphs(title)}</Box>
      </Box>
      <Text sx={styles.description}>{description}</Text>
      {needsUpgrade && (
        <Badge colorScheme='blue' mt={'4px'} sx={styles.badge}>
          <PiMedal />
          <Trans i18nKey='upgrade'>Upgrade</Trans>
        </Badge>
      )}
    </Tab>
  )
}
