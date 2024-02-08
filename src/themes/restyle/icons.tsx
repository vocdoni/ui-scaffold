import { Icon, Img } from '@chakra-ui/react'
import { AiFillCheckCircle } from 'react-icons/ai'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import { IoCloseOutline } from 'react-icons/io5'

export const Close = () => <Icon as={IoCloseOutline} mt='1.5px' boxSize={5} />

export const Check = AiFillCheckCircle

export const Logo = () => <Img src='/assets/logo-classic.svg' alt='vocdoni icon' maxWidth={150} />

export const GoBack = () => <Icon as={FaRegArrowAltCircleLeft} mt='1.5px' boxSize={5} />
