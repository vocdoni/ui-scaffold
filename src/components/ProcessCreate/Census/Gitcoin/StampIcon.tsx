import { Image } from '@chakra-ui/react'
import fallback from '/assets/default-avatar.png'
import { forwardRef } from 'react'

interface StampIconProps {
  iconURI: string | undefined
  alt?: string
  size?: number
}

export const StampIcon = forwardRef<HTMLImageElement, StampIconProps>(({ iconURI, alt, size = 5 }, ref) => {
  // Note: the forwardRef is used to show a tooltip on the image
  return <Image src={iconURI} fallbackSrc={fallback} alt={alt} mr={{ base: 2, lg: 4 }} w={size} h={size} ref={ref} />
})
