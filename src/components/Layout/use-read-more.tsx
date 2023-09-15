import { Box, Button } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

export const useReadMoreMD = (containerMaxHeightPx: number, tantPerCentGradient?: number) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isTruncated, setIsTruncated] = useState(false)
  const [readMore, setReadMore] = useState(false)

  const handleReadMore = () => setReadMore((prev) => !prev)

  useEffect(() => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.getBoundingClientRect().height

      if (containerHeight > containerMaxHeightPx) {
        setIsTruncated(true)
        setReadMore(true)
      }
    }
  }, [])

  const ReadMoreMDWrapper = ({ children, from, to, ...props }: any) => (
    <Box
      {...props}
      ref={containerRef}
      position='relative'
      height={readMore ? `${containerMaxHeightPx}px` : 'auto'}
      overflow='hidden'
      sx={{
        '&::before': {
          content: '""',
          position: 'absolute',
          height: isTruncated
            ? `${(containerMaxHeightPx * (tantPerCentGradient ? tantPerCentGradient : containerMaxHeightPx)) / 100}px`
            : '0',
          width: '100%',
          bottom: 0,
          background:
            isTruncated && readMore
              ? `linear-gradient(to bottom, ${from ? from : 'rgba(255, 255, 255, 0)'} 0%, ${
                  to ? to : 'rgba(255, 255, 255, 1)'
                } 100%)`
              : '',
        },
      }}
    >
      {children}
    </Box>
  )
  const ReadMoreMDBtn = ({ ...props }: any) =>
    isTruncated && (
      <Button onClick={handleReadMore} variant='link' {...props}>
        {readMore ? 'Read more' : 'Read less'}
      </Button>
    )

  return {
    containerRef,
    isTruncated,
    readMore,
    handleReadMore,
    ReadMoreMDWrapper,
    ReadMoreMDBtn,
  }
}
