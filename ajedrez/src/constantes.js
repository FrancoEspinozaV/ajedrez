export const initialBoard = Array.from({ length: 64 }, (_, index) => index)

export const emptySpace = '-'

export const WHITE_PIECES = {
  peon: [8, 9, 10, 11, 12, 13, 14, 15],
  torre: [0, 7],
  caballos: [1, 6],
  alfil: [2, 5],
  reina: [3],
  rey: [4],
}

export const BLACK_PIECES = {
  peon: [48, 49, 50, 51, 52, 53, 54, 55],
  torre: [56, 63],
  caballos: [57, 62],
  alfil: [58, 61],
  reina: [59],
  rey: [60],
}
