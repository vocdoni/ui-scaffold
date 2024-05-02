import { Global } from '@emotion/react'
import basier from '/fonts/Basier.otf'

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'basier';
        font-weight: normal;
        src: url('${basier}') format('opentype');
      }
    `}
  />
)

export default Fonts
