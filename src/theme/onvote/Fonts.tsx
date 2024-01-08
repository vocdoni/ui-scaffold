import { Global } from '@emotion/react'
import archivoBold from '/fonts/archivo/Archivo-Bold.ttf'
import archivo from '/fonts/archivo/Archivo.ttf'
import pixeloidSansBold from '/fonts/pixeloidsans/PixeloidSans-Bold.ttf'
import pixeloidSans from '/fonts/pixeloidsans/PixeloidSans.ttf'

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'pixeloidsans';
        font-style: normal;
        src: url('${pixeloidSans}') format('truetype');
      }
      @font-face {
        font-family: 'pixeloidsans';
        font-style: bold;
        src: url('${pixeloidSansBold}') format('truetype');
      }
      @font-face {
        font-family: 'Archivo';
        font-style: normal;
        src: url('${archivo}') format('truetype');
      }
      @font-face {
        font-family: 'Archivo';
        font-style: bold;
        src: url('${archivoBold}') format('truetype');
      }
    `}
  />
)

export default Fonts
