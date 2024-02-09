import { Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useProcessCreationSteps } from '../Steps/use-steps'
import { useMemo } from 'react'
import { CensusPreviewRowsLimit } from '~constants'

const PreviewCensusCspGithub = () => {
  const { t } = useTranslation()
  const {
    form: { userList, maxCensusSize },
  } = useProcessCreationSteps()

  const data = useMemo(
    () => (userList!.length > CensusPreviewRowsLimit ? userList?.slice(0, CensusPreviewRowsLimit) : userList),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userList]
  )

  if (!userList || !data) return null

  return (
    <Flex flexDirection='column' gap={1}>
      <Box overflowX='scroll' maxW='100%'>
        <Table variant='striped' colorScheme='blackAlpha' fontSize='xs' size='sm'>
          <Thead>
            <Tr>
              <Th>{t('form.process_create.confirm.census_preview_list.github_address')}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row, r) => (
              <Tr key={r}>
                <Td key={row.login}>{row.login}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Text color='process_create.description'>
        {t('form.process_create.confirm.census_total_people', { count: maxCensusSize })}
      </Text>
      {data.length !== userList.length && (
        <Text
          color='process_create.description'
          children={t('form.process_create.confirm.census_preview_is_shortened', {
            limit: CensusPreviewRowsLimit,
          })}
        />
      )}
    </Flex>
  )
}

export default PreviewCensusCspGithub
