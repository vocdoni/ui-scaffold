import { Image, Tooltip } from '@chakra-ui/react'
import fallback from '/assets/default-avatar.png'

interface StampIconProps {
  iconURI: string | undefined
  alt?: string
  size?: number
  tooltip?: string
}

export const StampIcon = ({ iconURI, alt, size = 5, tooltip }: StampIconProps) => {
  // tooltip won't be shown if is null
  return (
    <Tooltip label={tooltip} placement='auto-start'>
      <Image src={iconURI} fallbackSrc={fallback} alt={alt} w={size} h={size} />
    </Tooltip>
  )
}
