import { Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FaucetView } from '~components/Faucet/FaucetView'
import { useFaucet } from '~components/Faucet/use-faucet'

const Faucet = () => {
  const { getAuthTypes } = useFaucet()
  const [faucetAmount, setFaucetAmount] = useState<number>(0)
  const [waitHours, setWaitHours] = useState<number>(0)

  useEffect(() => {
    ;(async () => {
      try {
        const atypes = await getAuthTypes()
        if (atypes.auth.oauth) {
          setFaucetAmount(atypes.auth.oauth)
        }
        setWaitHours(Math.floor(atypes.waitSeconds / 3600))
      } catch (e) {
        setFaucetAmount(NaN)
        setWaitHours(NaN)
      }
    })()
  }, [])

  return (
    <>
      <Flex direction='column' gap={4} mt={10} mb={44} className='site-wrapper'>
        {import.meta.env.features.faucet && <FaucetView amount={faucetAmount} waitHours={waitHours} />}
      </Flex>
    </>
  )
}

export default Faucet
