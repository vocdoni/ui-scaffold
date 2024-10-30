import { Box, Button } from '@chakra-ui/react'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface ReadMoreMarkdownWrapperProps {
  children: ReactNode
  fromLight?: string
  toLight?: string
  fromDark?: string
  toDark?: string
}

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
    fromLight = 'var(--chakra-colors-read_more-from-light)',
    fromDark = 'var(--chakra-colors-read_more-from-dark)',
    toLight = 'var(--chakra-colors-read_more-to-light)',
    toDark = 'var(--chakra-colors-read_more-to-dark)',
    ...props
  }: ReadMoreMarkdownWrapperProps) => {
    return (
      <Box
        {...props}
        ref={containerRef}
        position='relative'
        height={readMore ? `${containerMaxHeightPx}px` : 'auto'}
        overflow='hidden'
      >
        <Box
          position='absolute'
          height={
            isTruncated
              ? `${(containerMaxHeightPx * (tantPerCentGradient ? tantPerCentGradient : containerMaxHeightPx)) / 100}px`
              : 0
          }
          w='full'
          bottom={0}
          pointerEvents='none'
          background={isTruncated && readMore ? `linear-gradient(to bottom, ${fromLight} 0%, ${toLight} 100%)` : 'none'}
          _dark={{
            background: isTruncated && readMore ? `linear-gradient(to bottom, ${fromDark} 0%, ${toDark} 100%)` : 'none',
          }}
        ></Box>
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

{
  /* <Box
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
</Box> */
}
