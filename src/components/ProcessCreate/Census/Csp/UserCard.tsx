import { DeleteIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { Avatar, Box, Card, CardHeader, Flex, Heading, IconButton, Link } from '@chakra-ui/react'

type ICardUser = {
  login: string
  avatar_url: string
  html_url: string
}

type UserCardProps = {
  user: ICardUser
  clickedBgColor?: string
  size?: 'lg' | 'md' | 'sm' | 'xs'
  onClick?: any
  onRemove?: any
  externalLink?: boolean
}

const UserCard = ({ user, clickedBgColor, size = 'sm', onClick, onRemove, externalLink = true }: UserCardProps) => {
  const handleClick = () => {
    if (typeof onClick === 'function') onClick(user)
  }
  const handleRemove = () => {
    if (typeof onRemove === 'function') onRemove(user)
  }

  const clickable = typeof onClick === 'function'
  let cardPadding = '5'
  if (size === 'xs') cardPadding = '0'
  if (size === 'sm') cardPadding = '3'

  return (
    <Card onClick={handleClick} style={clickable ? { cursor: 'pointer' } : {}} bgColor={clickedBgColor}>
      <CardHeader p={cardPadding}>
        <Flex>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Avatar name={user.login} src={user.avatar_url} size={size} />

            <Box mr={1}>
              <Heading size={size}>{user.login}</Heading>
            </Box>
          </Flex>

          {externalLink && (
            <Link href={user.html_url} isExternal>
              <IconButton
                variant='ghost'
                colorScheme='gray'
                aria-label='Profile'
                icon={<ExternalLinkIcon />}
                size={size}
              />
            </Link>
          )}

          {onRemove && (
            <IconButton
              onClick={handleRemove}
              variant='ghost'
              colorScheme='red'
              aria-label='Profile'
              icon={<DeleteIcon />}
              size={size}
            />
          )}
        </Flex>
      </CardHeader>
    </Card>
  )
}

export default UserCard
