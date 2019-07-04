import {css, keyframes} from 'react-emotion'

export const theme = {
  EXTRALIGHTBLUE: '#6A94CB',
  LIGHTBLUE: '#4375B5',
  BLUE: '#265FA7',
  DARKBLUE: '#0E4791',
  EXTRADARKBLUE: '#093771',
  EXTRALIGHTORANGE: '#FFD482',
  LIGHTORANGE: '#FFC558',
  ORANGE: '#FFB933',
  DARKORANGE: '#E79A07',
  EXTRADARKORANGE: '#B27500',
  YELLOW: '#FFD900',
  GREEN: '#9FD134',
  PINKRED: '#FF0034',
  GREY80: '#333333',
  GREY50: '#7F7F7F',
  GREY10: '#E5E5E5',
}

export const lightTheme = {
  ...theme,
  FONT: '#333333',
  BACKGROUND: '#FFFFFF',
  HASHTAG: '#265FA7',
  BACKGROUNDPOPUP: '#FFFFFF',
  BORDERPOPUP: '#E5E5E5',
  BORDERFIELD: '#FFD482',
  LABELINPUT: 'rgba(112,112,112,0.5)',
  TEXTINPUT: '#000000',
}

export const nightTheme = {
  ...theme,
  FONT: '#FFFFFF',
  BACKGROUND: '#333333',
  HASHTAG: '#FFB933',
  BACKGROUNDPOPUP: '#4C4C4C',
  BORDERPOPUP: '#7F7F7F',
  BORDERFIELD: '#7F7F7F',
  LABELINPUT: '#FFFFFF',
  TEXTINPUT: '#FFFFFF',
}

export const breakpoints = {
  mobile: 767,
  tablet: 990,
  desktop: 1024,
  extra: 1170,
}

export const responsive = Object.keys(breakpoints).reduce(
  (accumulator, label) => {
    let prefix = typeof breakpoints[label] === 'string' ? '' : 'max-width:'
    let suffix = typeof breakpoints[label] === 'string' ? '' : 'px'
    accumulator[label] = cls =>
      css`
        @media (${prefix + breakpoints[label] + suffix}) {
          ${cls};
        }
      `
    return accumulator
  },
  {},
)

export const fadeIn = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
`
