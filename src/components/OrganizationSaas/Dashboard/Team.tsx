import { Button, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import Invite from './Invite'

const Team = () => {
  const [inviteView, setInviteView] = useState(false)

  return (
    <>
      <Flex justifyContent='end'>
        {!inviteView && <Button onClick={() => setInviteView(true)}>Invite People</Button>}
      </Flex>
      {inviteView && <Invite setInviteView={setInviteView} />}
    </>
  )
}

export default Team
