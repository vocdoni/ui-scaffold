import { Image } from '@chakra-ui/react'
import fallback from '/assets/default-avatar.png'

export const StampIcon = ({ iconURI, alt }: { iconURI: string | undefined; alt?: string }) => {
  const size = 5

  return <Image src={iconURI} fallbackSrc={fallback} alt={alt} mr={{ base: 2, lg: 4 }} w={size} h={size} />
}
