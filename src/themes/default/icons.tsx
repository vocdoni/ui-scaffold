import { Icon, Img } from '@chakra-ui/react'
import { AiFillCheckCircle } from 'react-icons/ai'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import { IoCloseOutline } from 'react-icons/io5'

export const Close = IoCloseOutline

export const Check = AiFillCheckCircle

export const Logo = () => <Img src='/assets/vocdoni_icon.png' alt='vocdoni icon' maxWidth={10} />

export const LogoMbl = () => <Img src='/assets/vocdoni_icon.png' alt='vocdoni icon' maxWidth={10} />

export const GoBack = () => <Icon as={FaRegArrowAltCircleLeft} mt='1.5px' boxSize={5} />
