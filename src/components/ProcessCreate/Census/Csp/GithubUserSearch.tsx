import { Flex, FormLabel, Input, List, ListItem, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import UserCard from './UserCard'
import { useTranslation } from 'react-i18next'
import { useFieldArray, useFormContext } from 'react-hook-form'

const GithubUserSearch = ({ ...props }) => {
  const toast = useToast()
  const { t } = useTranslation()

  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchTimeout, setSearchTimeout] = useState<any>(null)
  const [userList, setUserList] = useState<any[]>([])
  const [clickedUsers, setClickedUsers] = useState<any[]>([])

  const {
    register,
    formState: { errors },
    watch,
    setValue,
    trigger,
    resetField,
    setError,
  } = useFormContext()

  const { fields, remove } = useFieldArray({
    name: 'addresses',
  })

  const addresses = watch('addresses')

  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }

    setSearchTimeout(setTimeout(search, 500))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery])

  useEffect(() => {
    if (typeof props.onUpdateSelection === 'function') {
      props.onUpdateSelection(clickedUsers)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedUsers])

  const handleInputChange = (text: string) => {
    setSearchQuery(text)
  }

  const search = async () => {
    setUserList([])
    if (!searchQuery) return

    try {
      let ulist = []
      let response = await fetch(`https://api.github.com/search/users?q=${searchQuery}`)
      let data = await response.json()
      if (data.items.length > 0) {
        ulist.push(...data.items)
      }

      // Adding organization members
      response = await fetch(`https://api.github.com/orgs/${searchQuery}/public_members`)
      data = await response.json()
      if (data.length > 0) {
        ulist.push(...data)
      }
      const uniqueArray = ulist.filter((obj, index, self) => self.findIndex((o) => o.id === obj.id) === index)
      setUserList(uniqueArray)
    } catch (error) {
      console.error('Error fetching users:', error)
      toast({
        title: t('csp_census.github.error_fetching_users'),
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const handleUserClick = (user: any) => {
    if (clickedUsers.includes(user)) {
      setClickedUsers((prevClickedUsers) => prevClickedUsers.filter((u) => u.id !== user.id))
    } else {
      setClickedUsers((prevClickedUsers) => [...prevClickedUsers, user])
    }
  }

  const handleRemove = (user: any) => {
    setClickedUsers((prevClickedUsers) => prevClickedUsers.filter((u) => u.id !== user.id))
  }

  return (
    <>
      <Input type='text' placeholder='Search...' onChange={(e) => handleInputChange(e.target.value)} />

      {userList && userList.length > 0 && (
        <List spacing={2} maxH={500} overflow={'scroll'}>
          {userList.map((user) => (
            <ListItem key={user.id} style={{ listStyleType: 'none' }}>
              <UserCard
                size='sm'
                user={user}
                onClick={handleUserClick}
                clickedBgColor={clickedUsers.includes(user) ? 'teal.100' : 'transparent'}
              />
            </ListItem>
          ))}
        </List>
      )}

      {props.showSelectedList && clickedUsers.length > 0 && (
        <>
          <FormLabel mt={8}>{t('csp_census.github.selected_users')}</FormLabel>
          <List>
            <Flex>
              {clickedUsers.map((user) => (
                <ListItem key={user.id} mr={2}>
                  <UserCard user={user} size={'xs'} onRemove={handleRemove} externalLink={false} />
                </ListItem>
              ))}
            </Flex>
          </List>
        </>
      )}
    </>
  )
}

export default GithubUserSearch
