import { Box, Button } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const useReadMoreMarkdown = (containerMaxHeightPx: number, tantPerCentGradient?: number) => {
  const { t } = useTranslation()
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

  const ReadMoreMarkdownWrapper = ({
    children,
    fromLight = 'read_more.from_light',
    fromDark = 'read_more.from_dark',
    toLight = 'read_more.to_light',
    toDark = 'read_more.to_dark',
    ...props
  }: any) => {
    return (
      <Box
        {...props}
        ref={containerRef}
        position='relative'
        height={readMore ? `${containerMaxHeightPx}px` : 'auto'}
        overflow='hidden'
        _before={{
          content: '""',
          position: 'absolute',
          height: isTruncated
            ? `${(containerMaxHeightPx * (tantPerCentGradient ? tantPerCentGradient : containerMaxHeightPx)) / 100}px`
            : '0',
          width: '100%',
          bottom: 0,
          background: isTruncated && readMore ? `linear-gradient(to bottom, ${fromLight} 0%, ${toLight} 100%)` : '',
        }}
        _dark={{
          _before: {
            content: '""',
            position: 'absolute',
            height: isTruncated
              ? `${(containerMaxHeightPx * (tantPerCentGradient ? tantPerCentGradient : containerMaxHeightPx)) / 100}px`
              : '0',
            width: '100%',
            bottom: 0,
            background: isTruncated && readMore ? `linear-gradient(to bottom, ${fromDark} 0%, ${toDark} 100%)` : '',
          },
        }}
      >
        {children}
      </Box>
    )
  }
  const ReadMoreMarkdownButton = ({ ...props }: any) =>
    isTruncated ? (
      <Button onClick={handleReadMore} variant='' color='read_more' {...props}>
        {readMore ? t('use_read_more.read_more') : t('use_read_more.read_less')}
      </Button>
    ) : null

  return {
    containerRef,
    isTruncated,
    readMore,
    handleReadMore,
    ReadMoreMarkdownWrapper,
    ReadMoreMarkdownButton,
  }
}
