import { Img, ImgProps } from '@chakra-ui/react'
import check from '/assets/check-icon.svg'
import close from '/assets/close-icon.svg'
import goback from '/assets/goback-icon.svg'
import logo from '/assets/onvote-icon.svg'
import logoMbl from '/assets/vocdoni_icon.png'

export const Close = (props: ImgProps) => <Img src={close} alt='close' {...props} />

export const Check = (props: ImgProps) => <Img src={check} alt='check' {...props} />

export const Logo = (props: ImgProps) => <Img src={logo} alt='onvote logo' maxWidth={12} {...props} />

export const LogoMbl = (props: ImgProps) => <Img src={logoMbl} alt='vocdoni mbl icon' maxWidth={10} {...props} />

export const GoBack = (props: ImgProps) => <Img src={goback} alt='go back' {...props} />
